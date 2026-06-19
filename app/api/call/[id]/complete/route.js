// import { callWithDoctor, formatApiError } from "@/lib/zustand/callSession";
// import { prisma } from "@/lib/zustand/db";
// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import {
//   extractStructuredFromVapi,
//   getCallDurationSec,
//   normalizeConsultationMetaData,
//   pollVapiCallForReport,
//   buildDialogueTranscript,
// } from "@/lib/zustand/consultation";
// import { fetchVapiCall } from "@/lib/zustand/vapi";

// export async function POST(req, { params }) {
//   const { id: sessionId } = await params;

//   const { userId } = await auth();
//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }
//   const body = await req.json();
//   const { vapiCallId, durationSec: clientDurationSec } = body;
//   if (!vapiCallId) {
//     return NextResponse.json({ error: "vapiCallId required" }, { status: 400 });
//   }

//   const session = await prisma.callSession.findFirst({
//     where: { id: sessionId, userId },
//     include: { doctor: { select: { name: true } } },
//   });

//   if (!session) {
//     return NextResponse.json(
//       { error: "Call session not found" },
//       { status: 404 },
//     );
//   }

//   try {
//     const callData = await pollVapiCallForReport(fetchVapiCall, vapiCallId);
//     const structured = extractStructuredFromVapi(callData);
//     const hasReport = Boolean(structured?.complaint);

//     const transcript =
//       buildDialogueTranscript(callData) ||
//       "Consultation Completed. Transcript is still processing";

//     const duration = getCallDurationSec(
//       callData,
//       clientDurationSec || session.duration || 0,
//     );

//     const metaData = hasReport
//       ? normalizeConsultationMetaData(structured, {
//           doctorName: session.doctor?.name,
//         })
//       : {
//           doctorName: session.doctor?.name || "AI Specialist",
//           source: "pending",
//         };

//     const updatedSession = await prisma.callSession.update({
//       where: { id: sessionId },
//       data: {
//         status: hasReport ? "COMPLETED" : "PROCESSING",
//         vapiCallId,
//         duration,
//         metaData,
//         transcript,
//         endedAt: new Date(),
//       },
//       include: callWithDoctor,
//     });

//     return NextResponse.json(
//       { success: true, session: updatedSession },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error("/api/call/[id]/complete failed:", formatApiError(error));
//     await prisma.callSession
//       .update({
//         where: { id: sessionId },
//         data: { status: "FAILED", vapiCallId, endedAt: new Date() },
//       })
//       .catch(() => {});
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 },
//     );
//   }
// }
import { callWithDoctor, formatApiError } from "@/lib/zustand/callSession";
import { prisma } from "@/lib/zustand/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import {
  extractStructuredFromVapi,
  getCallDurationSec,
  normalizeConsultationMetaData,
  pollVapiCallForReport,
  buildDialogueTranscript,
} from "@/lib/zustand/consultation";
import { fetchVapiCall } from "@/lib/zustand/vapi";

export async function POST(req, { params }) {
  const { id: sessionId } = await params;

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const { vapiCallId, durationSec: clientDurationSec } = body;
  if (!vapiCallId) {
    return NextResponse.json({ error: "vapiCallId required" }, { status: 400 });
  }

  const session = await prisma.callSession.findFirst({
    where: { id: sessionId, userId },
    include: { doctor: { select: { name: true } } },
  });

  if (!session) {
    return NextResponse.json(
      { error: "Call session not found" },
      { status: 404 },
    );
  }

  try {
    const callData = await pollVapiCallForReport(fetchVapiCall, vapiCallId);
    const structured = extractStructuredFromVapi(callData);
    const hasReport = Boolean(structured?.complaint);

    const transcript =
      buildDialogueTranscript(callData) ||
      "Consultation Completed. Transcript is still processing";

    const duration = getCallDurationSec(
      callData,
      clientDurationSec || session.duration || 0,
    );

    // ✅ Fix: "metaData" → "metadata" to match Prisma schema field name
    const metadata = hasReport
      ? normalizeConsultationMetaData(structured, {
          doctorName: session.doctor?.name,
        })
      : {
          doctorName: session.doctor?.name || "AI Specialist",
          source: "pending",
        };

    const updatedSession = await prisma.callSession.update({
      where: { id: sessionId },
      data: {
        status: hasReport ? "COMPLETED" : "PROCESSING",
        vapiCallId,
        duration,
        metadata, // ✅ Fix: was "metaData"
        transcript,
        endedAt: new Date(),
      },
      include: callWithDoctor,
    });

    return NextResponse.json(
      { success: true, session: updatedSession },
      { status: 200 },
    );
  } catch (error) {
    console.error("/api/call/[id]/complete failed:", formatApiError(error));
    await prisma.callSession
      .update({
        where: { id: sessionId },
        data: { status: "FAILED", vapiCallId, endedAt: new Date() },
      })
      .catch(() => {});
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
