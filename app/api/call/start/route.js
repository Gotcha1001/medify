import { formatApiError } from "@/lib/zustand/callSession";
import { prisma } from "@/lib/zustand/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { doctorId } = await req.json();
    if (!doctorId) {
      return NextResponse.json({ error: "doctorId required" }, { status: 400 });
    }

    const doctor = await prisma.doctorAgent.findUnique({
      where: { id: doctorId, isActive: true },
    });

    if (!doctor) {
      return NextResponse.json({ error: "doctor not found" }, { status: 404 });
    }
    if (!doctor.vapiAssistantId) {
      return NextResponse.json(
        { error: "Doctor assistant configuration missing" },
        { status: 500 },
      );
    }

    const session = await prisma.callSession.create({
      data: {
        userId,
        doctorId: doctor.id,
        status: "IN_PROGRESS",
        metadata: { doctorSlug: doctor.slug },
      },
    });

    return NextResponse.json(
      {
        callSessionId: session.id,
        assistantId: doctor.vapiAssistantId,
        doctor: { id: doctor.id, name: doctor.name, slug: doctor.slug },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("/api/calls/start failed:", formatApiError(error));
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
