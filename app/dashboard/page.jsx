"use client"
import { Suspense } from "react"
import { useAuth } from "@clerk/nextjs"
import { format } from "date-fns"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
import axios from "axios"
import DashboardStats from "@/components/DashboardStats"
import ConsultationSummary from "@/components/ConsultationSummary"
import { formatDuration } from "@/lib/format"
import Title from "@/components/Title"
import {
    Activity,
    Calendar,
    Clock,
    LayoutDashboard,
    Stethoscope,
    Stethoscrope
} from "lucide-react"
import EmptyState from "@/components/EmptyState"
import LoadingSkeleton from "@/components/LoadingSkeleton"
import { div, tr } from "framer-motion/client"


const STATUS_STYLES = {
    COMPLETED: "bg-success/10 text-success",
    PROCESSING: "bg-info/10 text-info animate-pulse",
    IN_PROGRESS: "bg-warning/10 text-warning",
    FAILED: "bg-error/10 text-error"
}


const UserDashboardPage = () => {
    return (
        <Suspense fallback={<DashboardSkeleton />}>
            <DashboardContent />

        </Suspense>
    )
}

const DashboardSkeleton = () => {
    return (
        <div className="py-12 space-y-12">
            <div className="h-20 bg-base-200/60 rounded-2xl animate-pulse" />
            <div className={`border border-info/20 rounded-2xl shadow-xs overflow-hidden h-28 animate-pulse`} />
            <div className={`border border-info/20 rounded-2xl shadow-xs overflow-hidden h-28 animate-pulse`} />
        </div>
    )
}

const DashboardContent = () => {
    const { getToken } = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams()
    const highlightId = searchParams.get("session")

    const [calls, setCalls] = useState([])
    const [loading, setLoading] = useState(true)
    const [selected, setSelected] = useState(null)
    const modalRef = useRef(null)
    const openedHighlight = useRef(false)

    const loadCalls = useCallback(async () => {
        try {
            const token = await getToken()
            const { data } = await axios.get(`/api/call`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCalls(data.calls || [])
            return data.calls || []

        } catch (error) {
            console.error("/api/call failed:", error?.message || error)
            return []
        } finally {
            setLoading(false)
        }

    }, [getToken])

    useEffect(() => {
        loadCalls()
    }, [loadCalls])

    useEffect(() => {
        if (!selected || selected.status !== "PROCESSING" || !getToken) return

        const poll = setInterval(async () => {
            try {
                const token = await getToken()
                const { data } = await axios.get(`/api/call/${selected.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                if (data.call) {
                    setSelected(data.call)
                    setCalls(prev => prev.map(c => c.id === data.call.id ? data.call : c))
                }
            } catch (error) {
                // ignore
            }
        }, 5000)

        return () => clearInterval(poll)
    }, [selected?.id, selected?.status, getToken])

    useEffect(() => {
        if (!highlightId || openedHighlight.current || !getToken) return

        const openSession = (call) => {
            openedHighlight.current = true;
            setSelected(call)
            modalRef.current.showModal()

        }
        const match = calls.find((c) => c.id === highlightId)
        if (match) {
            openSession(match)
            return
        }

        if (loading) return

        (async () => {
            try {
                const token = await getToken()
                const { data } = await axios.get(`/api/calls/${highlightId}`, { headers: { Authorization: `Bearer ${token}`, }, })
                if (data.call) {
                    openSession(data.call)
                }
            } catch (error) {
                //ignore
            }
        })

    }, [highlightId, calls, loading, getToken])

    const openModal = (call) => {
        setSelected(call)
        modalRef.current.showModal()
    }

    const closeModal = () => {
        setSelected(null)
        if (highlightId) router.push("/dashboard")
    }

    return (
        <div className="py-12 space-y-12">
            <Title headingStart="Consultation" headingEnd="Dashboard" subtext="Review past voice consultations, clinical summaries, and full transcripts." />
            <DashboardStats calls={calls} loading={loading} />

            <section className="border border-info/20 rounded-2xl shadow-xs overflow-hidden">

                {loading ? (
                    <div className="p-8">
                        <LoadingSkeleton variant="table-row" count={3} />
                    </div>
                ) : calls.length === 0 ? (
                    <EmptyState
                        icon={<Activity className="size-7 text-info" />}
                        title="No consultations yet"
                        description="Start a voice call with a doctor agent. Your summary will appear here when the call ends."
                        button={{
                            text: "Browse doctors",
                            href: "/doctors",
                        }}
                    />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="border-b border-info/10 text-base-content/60 text-xs uppercase">
                                <tr>
                                    <th className="font-bold">Date</th>
                                    <th className="font-bold">Doctor</th>
                                    <th className="font-bold">Complaint</th>
                                    <th className="font-bold">Duration</th>
                                    <th className="font-bold">Status</th>
                                    <th className="text-right font-bold">Report</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-base-200/40">
                                {calls.map((call) => {
                                    const meta = call.metadata || {}
                                    return (
                                        <tr key={call.id} className="hover:bg-info/5 cursor-pointer transition-colors" onClick={() => openModal(call)}>

                                            <td className="text-xs font-semibold py-4">
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar className="size-3.5 text-info" />
                                                    {call.createdAt
                                                        ? format(new Date(call.createdAt), "MMM d, yyyy h:mm a")
                                                        : "-"}
                                                </span>
                                            </td>

                                            <td className="font-semibold py-4">
                                                {call.doctor?.name || meta.doctorName || "AI Specialist"}
                                            </td>

                                            <td className="text-sm text-base-content/80 py-4">
                                                {meta.complaint || "-"}
                                            </td>

                                            <td className="text-xs font-mono py-4">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="size-3.5 text-info" />
                                                    {formatDuration(call.duration)}
                                                </span>
                                            </td>
                                            <td className="py-4">
                                                <span className={`badge badge-sm font-semibold border-none px-3 py-2.5 ${STATUS_STYLES[call.status] || "bg-base-200 text-base-content/60"}`}>
                                                    {call.status}
                                                </span>
                                            </td>
                                            <td className="text-right py-4">
                                                <button type="button" className="btn btn-info btn-soft btn-xs rounded-lg" onClick={(e) => { e.stopPropagation(); openModal(call); }}>View</button>
                                            </td>
                                        </tr>


                                    )
                                })}</tbody>
                        </table>
                    </div>
                )}
            </section>
            <dialog ref={modalRef} className="modal modal-middle" onClose={closeModal}>
                <div className="modal-box max-w-2xl rounded-2xl border border-info/10 bg-linear-to-br from-info/10 via-info/15 to-transparent p-6 md:p-8">
                    <div className="flex justify-between items-start border-b border-info/10 pb-4 mb-4">
                        <div>
                            <p className="text-[10px] font-bold text-info uppercase tracking-widest flex items-center gap-1">
                                <LayoutDashboard className="size-3.5" />
                                Consultation Report
                            </p>

                            <h3 className="text-lg font-bold tracking-tight">
                                {selected?.doctor?.name || selected?.metadata?.doctorName}
                            </h3>

                            <p className="text-xs text-base-content/60 flex items-center gap-1">
                                <Stethoscope className="size-3.5 text-info" />
                                {selected?.doctor?.specialty}
                            </p>
                        </div>
                        <form method="dialog">
                            <button
                                type="submit"
                                className="btn btn-sm btn-circle btn-ghost"
                                aria-label="Close"
                            >
                                ✕
                            </button>
                        </form>
                    </div>
                    {selected && <ConsultationSummary call={selected} />}
                    <form method="dialog" className="modal-backdrop">
                        <button type="submit">close</button>
                    </form>
                </div>
            </dialog>
        </div>
    )
}

export default UserDashboardPage