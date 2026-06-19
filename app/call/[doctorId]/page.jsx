import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

import { prisma } from "@/lib/zustand/db"
import Link from "next/link"
import { ShieldAlert, ArrowLeft, HeartPulse } from "lucide-react"
import { div } from "framer-motion/client"
import CallRoom from "@/components/CallRoom"

export const dynamic = "force-dynamic"

const CallPage = async ({ params }) => {

    const { doctorId } = await params
    const { userId, has } = await auth()

    // Fetch the specialized AI Doctor agent
    const doctor = await prisma.doctorAgent.findUnique({
        where: { id: doctorId, isActive: true }
    })


    if (!doctor) {
        return (
            <div className="py-20 flex flex-col items-center justify-center space-y-4 max-w-sm mx-auto px-4">
                <div className="size-16 rounded-2xl bg-error/10 text-error flexCenter mb-2">
                    <ShieldAlert className="size-8" />
                </div>
                <h3>Agent Not Found</h3>
                <p>The requested specialized AI Agent is missing or inactive.</p>
                <Link href="/doctors" className="btn btn-info text-info-content btn-sm rounded-xl px-6 gap-2 w-full">
                    <ArrowLeft className="btn btn-info text-info-content btn-sm rounded-xl px-6 gap-2 w-full" />
                    <ArrowLeft className="size-4" />
                    Browse Doctors
                </Link>
            </div>
        )
    }

    const allowed = doctor.requiredPlan === "FREE" || has({ plan: doctor.requiredPlan.toLowerCase() })

    if (!allowed) {
        return (
            <div className="py-20 flex flex-col items-center text-center space-y-4 max-w-sm mx-auto px-4 bg-linear-to-br from-info/30 via-info/15 to-transparent border border-base-200/50 p-8 rounded-[2.5rem] my-10">
                <div className="size-16 rounded-2xl bg-info/10 flexCenter mb-1">
                    <HeartPulse className="size-8" />
                </div>
                <h2>Upgrade Required</h2>
                <p className="text-base">
                    <span className="font-bold text-base-content">{doctor.name}</span> is a premium agent requiring an active <span className="badge badge-info text-info-content font-bold">{doctor.requiredPlan}</span> subscription plan.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
                    <Link href="/pricing" className="btn btn-info text-info-content btn-md rounded-xl flex-1 shadow-md shadow-info/10">
                        View Pricing Plans</Link>
                    <Link href="/doctors" className="btn btn-ghost btn-outline border-base-300 btn-md rounded-xl px-6">
                        Go Back</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="py-6 max-w-5xl mx-auto px-4 md:px-8">
            <CallRoom doctor={doctor} />
        </div>
    )
}

export default CallPage