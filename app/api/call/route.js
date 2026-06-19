import { callWithDoctor, formatApiError } from "@/lib/zustand/callSession";
import { prisma } from "@/lib/zustand/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const calls = await prisma.callSession.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: callWithDoctor,
    });

    return NextResponse.json({ calls }, { status: 200 });
  } catch (error) {
    console.error("/api/calls failed:", error?.message || error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
