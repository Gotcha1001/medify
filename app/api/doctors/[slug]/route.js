import { prisma } from "@/lib/zustand/db";
import { NextResponse } from "next/server";

export async function GET(_req, { params }) {
  try {
    const { slug } = await params;

    const doctor = await prisma.doctorAgent.findFirst({
      where: { isActive: true, slug },
      select: {
        id: true,
        name: true,
        slug: true,
        specialty: true,
        description: true,
        avatarUrl: true,
        requiredPlan: true,
        vapiAssistantId: true,
      },
    });
    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }
    return NextResponse.json({ doctor });
  } catch (error) {
    console.error("/api/doctors/[slug] failed:", error?.message || error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
