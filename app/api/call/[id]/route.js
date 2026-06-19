import { callWithDoctor } from "@/lib/zustand/callSession";
import { prisma } from "@/lib/zustand/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import {
  extractStructuredFromVapi,
  getCallDurationSec,
  normalizeConsultationMetaData,
  buildDialogueTranscript,
  vapiCallEnded,
} from "@/lib/zustand/consultation";
import { fetchVapiCall } from "@/lib/zustand/vapi";

export async function GET(_req, { params }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // ✅ Fix 1: was { id: userId } — should query by the session id, not userId
    let call = await prisma.callSession.findFirst({
      where: { id, userId },
      include: callWithDoctor,
    });
    if (!call) {
      return NextResponse.json(
        { error: "Call session not found" },
        { status: 404 },
      );
    }

    // ✅ Fix 4: self-heal stuck PROCESSING sessions by re-checking Vapi
    // instead of only trusting the DB snapshot written by /complete.
    if (call.status === "PROCESSING" && call.vapiCallId) {
      try {
        const callData = await fetchVapiCall(call.vapiCallId);

        // 🔍 TEMPORARY DEBUG LOG — remove after diagnosing
        console.log(
          "VAPI callData.analysis:",
          JSON.stringify(callData?.analysis, null, 2),
        );
        console.log("VAPI callData.status:", callData?.status);
        console.log("VAPI callData keys:", Object.keys(callData || {}));

        const structured = extractStructuredFromVapi(callData);
        const hasReport = Boolean(structured?.complaint);

        if (hasReport) {
          const transcript =
            buildDialogueTranscript(callData) || call.transcript || "";
          const duration = getCallDurationSec(callData, call.duration || 0);
          const metadata = normalizeConsultationMetaData(structured, {
            doctorName: call.doctor?.name,
          });

          call = await prisma.callSession.update({
            where: { id: call.id },
            data: { status: "COMPLETED", duration, metadata, transcript },
            include: callWithDoctor,
          });
        } else if (vapiCallEnded(callData)) {
          const ageMs = Date.now() - new Date(call.createdAt).getTime();
          const STALE_AFTER_MS = 5 * 60 * 1000; // 5 minutes
          if (ageMs > STALE_AFTER_MS) {
            const transcript =
              buildDialogueTranscript(callData) || call.transcript || "";
            const duration = getCallDurationSec(callData, call.duration || 0);
            call = await prisma.callSession.update({
              where: { id: call.id },
              data: {
                status: "COMPLETED",
                duration,
                transcript,
                metadata: {
                  doctorName: call.doctor?.name || "AI Specialist",
                  source: "fallback_no_structured_data",
                },
              },
              include: callWithDoctor,
            });
          }
        }
      } catch (vapiError) {
        console.error("Vapi re-check failed:", vapiError?.message || vapiError);
      }
    }

    return NextResponse.json({ call }, { status: 200 });
  } catch (error) {
    console.error("/api/call/[id] GET failed:", error?.message || error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Fix 2: params is a Promise in Next.js 15+ — must be awaited
    const { id } = await params;
    const body = await req.json();
    const existing = await prisma.callSession.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Call session not found" },
        { status: 404 },
      );
    }

    const call = await prisma.callSession.update({
      where: { id },
      data: {
        vapiCallId: body.vapiCallId || undefined,
      },
      include: callWithDoctor,
    });
    return NextResponse.json({ call }, { status: 200 });
  } catch (error) {
    // ✅ Fix 3: empty catch block silently swallowed all errors and
    //    returned undefined instead of a Response, causing the 500
    console.error("/api/call/[id] PATCH failed:", error?.message || error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
