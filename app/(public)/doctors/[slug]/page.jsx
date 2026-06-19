"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import { useClerk, useUser } from "@clerk/nextjs"
import { useDoctorStore } from "@/lib/zustand/doctorStore"
import LoadingSkeleton from "@/components/LoadingSkeleton"
import { video, ArrowLeft, Stethoscope, Star, Video } from "lucide-react"
import { div } from "framer-motion/client"

const DoctorDetails = () => {
    const { slug } = useParams()
    const router = useRouter()
    const { user } = useUser()
    const { openSignIn } = useClerk()
    const { fetchDoctorBySlug, selectedDoctor, isLoading } = useDoctorStore()
    const doctor = selectedDoctor



    useEffect(() => {
        if (slug) fetchDoctorBySlug(slug)
    }, [slug, fetchDoctorBySlug])


    // Laoding Skeleton matching card details structural architecture
    if (isLoading || !selectedDoctor) {
        return <LoadingSkeleton variant="detail" />
    }

    const startConsultation = () => {
        if (!user) {
            openSignIn()
            return
        }
        router.push(`/call/${doctor.id}`)
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row gap-6 items-center bg-linear-to-br from-info/30 via-info/15 to-transparent p-6 md:p-8 rounded-3xl w-full">
                {/* IMAGE */}
                <div className="shrink-0">
                    <div className="avatar">
                        <div className="mask mask-squircle h-33 w-33 bg-info">
                            <Image src={doctor.avatarUrl} alt="product" width={222} height={222} priority className="object-contain" />
                        </div>
                    </div>
                </div>
                <div className="text-center sm:text-left space-y-2 flex-1 w-full">
                    <div className="flex flex-col sm:flex-row items-center gap-2 justify-center sm:justify-start">
                        <h2>{doctor.name}</h2>
                        <span className={`badge badge-sm badge-outline ${doctor.requiredPlan === "PREMIUM" ? "badge-warning" : "badge-info"}`}>
                        </span>
                    </div>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm font-medium text-base-content/70">
                        <div className="badge badge-sm bg-info/10 text-info border-info/10 gap-1 py-2.5 px-3">
                            <Stethoscope className="size-3.5" />
                            {doctor.speciality}
                        </div>
                        <div className="flex items-center gap-1 text-xs font-bold text-base-content">
                            <Star className="size-3.5 fill-warning text-warning" /> 4.9 <span className="opacity-40 font-normal">(vetted agent)</span>
                        </div>
                    </div>
                </div>

            </div>
            <div className="py-6 text-left">
                <h5>About Specialist</h5>
                <p> {doctor.description} </p>
            </div>

            {/* CALL ACTION CONTROLS */}
            <div className="flex flex-col sm:flex-row gap-3 pb-8">
                <button onClick={startConsultation} className="btn btn-info">
                    <Video className="size-4" />
                    Start Voice Consultation
                </button>
                <Link href="/doctors" className="btn btn-info btn-outline">
                    <ArrowLeft className="size-4" />
                    Back To List
                </Link>
            </div>

        </div>

    )
}

export default DoctorDetails