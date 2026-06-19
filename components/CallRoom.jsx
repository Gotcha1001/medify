// "use client"
// import { useAuth, useUser } from "@clerk/nextjs"
// import { useRouter } from "next/navigation"
// import { useCallback, useEffect, useRef, useState } from "react"
// import toast from "react-hot-toast"
// import Image from "next/image"
// import axios from "axios"
// import Vapi from "@vapi-ai/web"
// import { useCallStore } from "@/lib/zustand/callStore"
// import CallControls from "./CallControls"
// import { Mic, Timer, Sparkles, Loader2, Sparkle } from "lucide-react"


// function isBeginVapiError(e) {
//     const message = e?.errorMsg || e?.message?.msg || e?.message || e?.error?.msg || "";

//     return (
//         message.includes("Meeting has ended") || e?.type === "daily-error" || e?.error?.type === "ejected"
//     )
// }

// const CallRoom = ({ doctor }) => {
//     const { user } = useUser()
//     const { getToken } = useAuth()
//     const router = useRouter()

//     const vapiRef = useRef(null)
//     const finalizingRef = useRef(false)

//     const getTokenRef = useRef(getToken)
//     const routerRef = useRef(router)

//     const [liveTranscript, setLiveTranscript] = useState("")

//     const {
//         status,
//         durationSec,
//         isMuted,
//         setVapi,
//         setCallSession,
//         setVapiCallId,
//         setDoctor,
//         setStatus,
//         startTimer,
//         stopTimer,
//         toggleMute,
//         reset,
//     } = useCallStore()

//     getTokenRef.current = getToken;
//     routerRef.current = router;

//     const finalizeCall = useCallback(async () => {
//         const callStatus = useCallStore.getState().status;

//         if (callStatus !== "in-call" && callStatus !== "saving") return;

//         if (finalizingRef.current) return
//         finalizingRef.current = true

//         setStatus("saving")
//         stopTimer()

//         setLiveTranscript("Generating AI consultation summary and saving your medical report...")

//         const { callSessionId: sessionId, vapiCallId: vapiId, durationSec } = useCallStore.getState()

//         if (sessionId) {
//             try {
//                 const token = await getTokenRef.current();
//                 await axios.post("/api/call" + sessionId + "/complete", { vapiCallId: vapiId, durationSec }, { headers: { Authorization: `Bearer ${token}` } })

//                 toast.success("Consultation saved successfully")

//                 routerRef.current.push(`/dashbaord?session=${sessionId}`)
//                 return
//             } catch (error) {
//                 console.error("Failed to finalize call", error);

//                 toast.error("Failed to save consultation");
//                 setStatus("idle")
//                 return

//             }
//         }
//         toast.success("Call completed")

//         routerRef.current.push("/dashbaord")
//     }, [setStatus, stopTimer])

//     const finalizeCallRef = useRef(finalizeCall)
//     finalizeCallRef.current = finalizeCall

//     useEffect(() => {
//         if (!user) return
//         const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;

//         if (!publicKey) {
//             toast.error("Vapi public key not found")
//             return
//         }

//         const vapi = new Vapi(publicKey)
//         vapiRef.current = vapi

//         setVapi(vapi)
//         setDoctor(doctor)

//         vapi.on("call-start", () => {
//             setStatus()
//             startTimer()

//             setLiveTranscript("Connected, Begin Speaking...")
//         })

//         vapi.on("call-start-success", async (event) => {
//             if (!event.callId) return
//             setVapiCallId(event.callId)

//             const sessionId = useCallStore.getStore().callSessionId

//             if (!sessionId) return
//             try {
//                 await axios.patch('/api/call/' + sessionId, { vapiCallId: event.callId }, {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 })
//             } catch (error) {
//                 console.error("Failed to sync call metrics", error)
//             }
//         })

//         vapi.on("message", (message) => {
//             if (message.type === 'transcript') {
//                 setLiveTranscript(
//                     `${message.role === "assistant" ? "🤖 AI" : "🤵🏻 You"}: ${message.transcript}`
//                 )
//             }
//         })

//         vapi.on("call-end", (event) => {
//             finalizeCallRef.current()
//         })

//         vapi.on("error", (error) => {
//             if (isBeginVapiError(e)) return

//             console.error(error)
//             toast.error("Connection drop encountered.")

//             setStatus("idle")
//             stopTimer()
//         })

//         return () => {
//             vapi.stop()
//             vapiRef.current = null
//         }

//     }, [user?.id, doctor?.id, setVapi, setDoctor, setStatus, startTimer, setVapiCallId])

//     useEffect(() => {
//         reset()

//         finalizingRef.current = false
//         setLiveTranscript("")
//     }, [doctor?.id, reset])

//     const formatDuration = (sec) => {
//         const minutes = Math.floor(sec / 60).toString().padStart(2, "0");
//         const seconds = (sec % 60).toString().padStart(2, "0");
//         return `${minutes}:${seconds}`
//     }

//     const startCall = async () => {
//         if (!vapiRef.current) return

//         try {
//             finalizingRef.current = false
//             setStatus("connecting")
//             const token = await getToken()

//             const { data } = await axios.post("/api/call/start", { docotorId: doctor.id }, { headers: { Authorization: `Bearer ${token}` } })

//             setCallSession(data.callSessionId)

//             await vapiRef.current.start(data.assistantId, {
//                 metadata: {
//                     userId: user.id,
//                     doctorId: doctor.id,
//                     callSessionId: data.callSessionId
//                 }
//             })

//         } catch (e) {
//             console.error(e)
//         }
//         const message = e.response?.data?.error || e.response?.data?.details || "Could not start call"
//         toast.error(message)
//         setStatus("idle")
//     }

//     const endCall = () => {
//         setStatus("saving")
//         stopTimer()
//         vapiRef.current?.stop()

//     }

//     const statusColors = {
//         idle: "badge-ghost",
//         connecting: "badge-warning animate-pulse",
//         "in-call": "badge-success gap-1.5 text-white font-bold animate-pulse",
//         saving: "badge-info text-white gap-1.5",
//     }

//     const statusLabel = {
//         idle: "Ready",
//         connecting: "Connecting...",
//         "in-call": "Live Consultation",
//         saving: "Saving Report..."
//     }

//     return (
//         <div className="max-w-xl mx-auto text-center space-y-8 py-6 px-4 flex flex-col items-center">
//             <div className="relative size-32 p-1.5 bg-linear-to-br from-info/30 via-info/15 to-transparent rounded-full shadow-lg border border-white/50 ring-4 ring-info/5">
//                 <div className="w-full h-full rounded-full overflow-hidden relative bg-base-200">
//                     <Image src={doctor.avatarUrl} alt={doctor.name} fill sizes="128px" priority className="object-cover object-top" />
//                 </div>
//                 {status === "in-call" && (
//                     <span className="absolute bottom-1 right-1 size-4 bg-success rounded-full ring-4 ring-white animate-ping"></span>
//                 )}
//                 {status === "saving" && (
//                     <span className="absolute inset-0 rounded-full bg-black/20 flex items-center justify-center">
//                         <Loader2 className="size-7 animate-spin text-info" />
//                     </span>
//                 )}
//             </div>

//             <div>
//                 <h2 className="tracking-tight">{doctor.name}</h2>
//                 <div className="badge badge-sm bg-info/10 text-info border-info/10 gap-1.5 font-semibold py-2.5 px-3.5 mt-2">
//                     <Sparkle className="size-3.5" />
//                     {doctor.speciality}
//                 </div>
//             </div>
//             <div className="grid grid-cols-2 bg-base-200/40 border border-base-200/60 w-full max-w-sm rounded-2xl p-4 shadow-xs divide-x divide-base-200/80">
//                 <div className="flexCenter flex-col p-2 space-y-1">
//                     <span className="text-[11px] font-bold uppercase tracking-wider text-base-content/40 flex items-center gap-1">
//                         <Mic className="size-3.5 text-info" />
//                         Channel
//                     </span>
//                     <div className={`badge badge-sm font-semibold border-none py-2 px-3 ${statusColors[status]}`}>
//                         {statusLabel[status]}
//                     </div>
//                 </div>
//                 <div className="flexCenter flex-col p-2 space-y-1">
//                     <span className="text-[11px] font-bold uppercase tracking-wider text-base-content/40 flex items-center gap-1">
//                         <Timer className="size-3.5 text-info" />
//                         Duration
//                     </span>
//                     <div className={`badge badge-sm font-semibold border-none py-2 px-3 ${statusColors[status]}`}>
//                         {formatDuration(durationSec)}
//                     </div>
//                 </div>


//             </div>
//             <div className="w-full max-w-md bg-linear-to-br from-info/30 via-info/15 to-transparent border border-base-200/50 rounded-2xl p-5 shadow-inner min-h-24 flex items-center justify-center text-center">
//                 <p
//                     className={`text-xs md:text-sm leading-relaxed ${liveTranscript
//                         ? "text-base-content/90 font-medium"
//                         : "text-base-content/40 italic"
//                         }`}
//                 >
//                     {liveTranscript ||
//                         "Voice terminal inactive. Click schedule trigger below to call agent..."}
//                 </p>
//             </div>
//             <div className="w-full max-w-sm pt-2">
//                 <CallControls
//                     status={status}
//                     isMuted={isMuted}
//                     onStart={startCall}
//                     onEnd={endCall}
//                     onToggleMute={toggleMute}
//                 />
//             </div>

//         </div>
//     )
// }

// export default CallRoom

"use client"
import { useAuth, useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import Image from "next/image"
import axios from "axios"
import Vapi from "@vapi-ai/web"
import { useCallStore } from "@/lib/zustand/callStore"
import CallControls from "./CallControls"
import { Mic, Timer, Loader2, Sparkle } from "lucide-react"

function isBeginVapiError(e) {
    const message = e?.errorMsg || e?.message?.msg || e?.message || e?.error?.msg || "";
    return (
        message.includes("Meeting has ended") || e?.type === "daily-error" || e?.error?.type === "ejected"
    )
}

const CallRoom = ({ doctor }) => {
    const { user } = useUser()
    const { getToken } = useAuth()
    const router = useRouter()

    const vapiRef = useRef(null)
    const finalizingRef = useRef(false)

    const getTokenRef = useRef(getToken)
    const routerRef = useRef(router)

    const [liveTranscript, setLiveTranscript] = useState("")

    const {
        status,
        durationSec,
        isMuted,
        setVapi,
        setCallSession,
        setVapiCallId,
        setDoctor,
        setStatus,
        startTimer,
        stopTimer,
        toggleMute,
        reset,
    } = useCallStore()

    getTokenRef.current = getToken;
    routerRef.current = router;

    const finalizeCall = useCallback(async () => {
        const callStatus = useCallStore.getState().status;

        if (callStatus !== "in-call" && callStatus !== "saving") return;
        if (finalizingRef.current) return

        finalizingRef.current = true
        setStatus("saving")
        stopTimer()

        setLiveTranscript("Generating AI consultation summary and saving your medical report...")

        const { callSessionId: sessionId, vapiCallId: vapiId, durationSec } = useCallStore.getState()

        if (sessionId) {
            try {
                const token = await getTokenRef.current();
                // ✅ Fix 1: was missing "/" between "/api/call" and sessionId
                await axios.post("/api/call/" + sessionId + "/complete", { vapiCallId: vapiId, durationSec }, {
                    headers: { Authorization: `Bearer ${token}` }
                })

                toast.success("Consultation saved successfully")
                // ✅ Fix 2: typo "/dashbaord" → "/dashboard"
                routerRef.current.push(`/dashboard?session=${sessionId}`)
                return
            } catch (error) {
                console.error("Failed to finalize call", error);
                toast.error("Failed to save consultation");
                setStatus("idle")
                return
            }
        }

        toast.success("Call completed")
        // ✅ Fix 2: typo "/dashbaord" → "/dashboard"
        routerRef.current.push("/dashboard")
    }, [setStatus, stopTimer])

    const finalizeCallRef = useRef(finalizeCall)
    finalizeCallRef.current = finalizeCall

    useEffect(() => {
        if (!user) return
        const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;

        if (!publicKey) {
            toast.error("Vapi public key not found")
            return
        }

        const vapi = new Vapi(publicKey)
        vapiRef.current = vapi

        setVapi(vapi)
        setDoctor(doctor)

        vapi.on("call-start", () => {
            // ✅ Fix 3: setStatus() called with no argument — should be "in-call"
            setStatus("in-call")
            startTimer()
            setLiveTranscript("Connected, Begin Speaking...")
        })

        vapi.on("call-start-success", async (event) => {
            if (!event.callId) return
            setVapiCallId(event.callId)

            // ✅ Fix 4: useCallStore.getStore() → useCallStore.getState()
            const sessionId = useCallStore.getState().callSessionId
            if (!sessionId) return

            try {
                // ✅ Fix 5: token was not defined in this scope
                const token = await getTokenRef.current();
                await axios.patch('/api/call/' + sessionId, { vapiCallId: event.callId }, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            } catch (error) {
                console.error("Failed to sync call metrics", error)
            }
        })

        vapi.on("message", (message) => {
            if (message.type === 'transcript') {
                setLiveTranscript(
                    `${message.role === "assistant" ? "🤖 AI" : "🤵🏻 You"}: ${message.transcript}`
                )
            }
        })

        vapi.on("call-end", () => {
            finalizeCallRef.current()
        })

        vapi.on("error", (error) => {
            // ✅ Fix 6: was isBeginVapiError(e) — parameter is named "error"
            if (isBeginVapiError(error)) return

            console.error(error)
            toast.error("Connection drop encountered.")
            setStatus("idle")
            stopTimer()
        })

        return () => {
            vapi.stop()
            vapiRef.current = null
        }

    }, [user?.id, doctor?.id, setVapi, setDoctor, setStatus, startTimer, setVapiCallId])

    useEffect(() => {
        reset()
        finalizingRef.current = false
        setLiveTranscript("")
    }, [doctor?.id, reset])

    const formatDuration = (sec) => {
        const minutes = Math.floor(sec / 60).toString().padStart(2, "0");
        const seconds = (sec % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`
    }

    const startCall = async () => {
        if (!vapiRef.current) return

        try {
            finalizingRef.current = false
            setStatus("connecting")
            const token = await getToken()

            // ✅ Fix 7: typo "docotorId" → "doctorId"
            const { data } = await axios.post("/api/call/start", { doctorId: doctor.id }, {
                headers: { Authorization: `Bearer ${token}` }
            })

            setCallSession(data.callSessionId)

            await vapiRef.current.start(data.assistantId, {
                metadata: {
                    userId: user.id,
                    doctorId: doctor.id,
                    callSessionId: data.callSessionId
                }
            })
        } catch (e) {
            // ✅ Fix 8: error handling was outside the catch block
            console.error(e)
            const message = e.response?.data?.error || e.response?.data?.details || "Could not start call"
            toast.error(message)
            setStatus("idle")
        }
    }

    const endCall = () => {
        setStatus("saving")
        stopTimer()
        vapiRef.current?.stop()
    }

    const statusColors = {
        idle: "badge-ghost",
        connecting: "badge-warning animate-pulse",
        "in-call": "badge-success gap-1.5 text-white font-bold animate-pulse",
        saving: "badge-info text-white gap-1.5",
    }

    const statusLabel = {
        idle: "Ready",
        connecting: "Connecting...",
        "in-call": "Live Consultation",
        saving: "Saving Report..."
    }

    return (
        <div className="max-w-xl mx-auto text-center space-y-4 py-6 px-4 flex flex-col items-center">
            <div className="relative size-32 p-1.5 bg-linear-to-br from-info/30 via-info/15 to-transparent rounded-full shadow-lg border border-white/50 ring-4 ring-info/5">
                <div className="w-full h-full rounded-full overflow-hidden relative bg-base-200">
                    <Image src={doctor.avatarUrl} alt={doctor.name} fill sizes="128px" priority className="object-cover object-top" />
                </div>
                {status === "in-call" && (
                    <span className="absolute bottom-1 right-1 size-4 bg-success rounded-full ring-4 ring-white animate-ping"></span>
                )}
                {status === "saving" && (
                    <span className="absolute inset-0 rounded-full bg-black/20 flex items-center justify-center">
                        <Loader2 className="size-7 animate-spin text-info" />
                    </span>
                )}
            </div>

            <div>
                <h2 className="tracking-tight">{doctor.name}</h2>
                <div className="badge badge-sm bg-info/10 text-info border-info/10 gap-1.5 font-semibold py-2.5 px-3.5 mt-2">
                    <Sparkle className="size-3.5" />
                    {doctor.speciality}
                </div>
            </div>

            <div className="grid grid-cols-2 bg-base-200/40 border border-base-200/60 w-full max-w-sm rounded-2xl p-4 shadow-xs divide-x divide-base-200/80">
                <div className="flexCenter flex-col p-2 space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-base-content/40 flex items-center gap-1">
                        <Mic className="size-3.5 text-info" />
                        Channel
                    </span>
                    <div className={`badge badge-sm font-semibold border-none py-2 px-3 ${statusColors[status]}`}>
                        {statusLabel[status]}
                    </div>
                </div>
                <div className="flexCenter flex-col p-2 space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-base-content/40 flex items-center gap-1">
                        <Timer className="size-3.5 text-info" />
                        Duration
                    </span>
                    <div className={`text-xl text-base-content tracking-tight`}>
                        {formatDuration(durationSec)}
                    </div>
                </div>
            </div>

            <div className="w-full max-w-md bg-linear-to-br from-info/30 via-info/15 to-transparent border border-base-200/50 rounded-2xl p-5 shadow-inner min-h-24 flex items-center justify-center text-center">
                <p className={`text-xs md:text-sm leading-relaxed ${liveTranscript ? "text-base-content/90 font-medium" : "text-base-content/40 italic"}`}>
                    {liveTranscript || "Voice terminal inactive. Click schedule trigger below to call agent..."}
                </p>
            </div>

            <div className="w-full max-w-sm pt-2">
                <CallControls
                    status={status}
                    isMuted={isMuted}
                    onStart={startCall}
                    onEnd={endCall}
                    onToggleMute={toggleMute}
                />
            </div>
        </div>
    )
}

export default CallRoom