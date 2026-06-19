import { prisma } from "@/lib/zustand/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const doctors = await prisma.doctorAgent.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    });
    return NextResponse.json({ doctors });
  } catch (error) {
    console.error("/api/doctors failed:", error?.message || error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
