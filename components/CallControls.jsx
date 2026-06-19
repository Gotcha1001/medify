"use client"
import { Mic, MicOff, Phone, PhoneOff } from "lucide-react"

const CallControls = ({
    status, isMuted, onStart, onEnd, onToggleMute,
}) => {
    // Renders a unified, clean centered trigger element if the channel is completely cold.

    if (status === "idle" || status === "ended") {
        return (
            <div className="flex flex-col items-center gap-2">
                <button
                    className="btn btn-info text-info-content btn-circle btn-lg shadow-lg shadow-info/25 hover:scale-95 transition-all group duration-300"
                    onClick={onStart}
                    aria-label="Start audio voice consultation call"
                >
                    <Phone className="size-6 group-hover:animate-pulse" />
                </button>
            </div>
        )
    }
    return (
        <div className="flexCenter gap-5 bg-base/200/40 border border-base-200/60 py-3 px-6 rounded-full w-fit mx-auto backdrop-blur-md shadow-xs animate-fade-in">
            <button
                onClick={onToggleMute}
                className={`btn btn-circle btn-md transition-all ${isMuted
                    ? "bg-error/10 text-error border-error/20 hover:bg-error/20"
                    : "btn-ghost text-base-content/70 hover:bg-base-300/60"
                    }`}
                disabled={status !== "in-call"}
                aria-label={isMuted ? "Unmute mic input" : "Mute mic input"}
            >
                {isMuted ? <MicOff className="size-5" /> : <Mic className="size-5" />}
            </button>

            {/* Disconnect End-Call Action  */}
            <button
                onClick={onEnd}
                className="btn btn-error text-white btn-circle btn-md shadow-md shadow-error/25 hover:scale-105 active:scale-95 transition-all duration-200"
                aria-label="End current voice consultation session"
            >
                <PhoneOff className="size-5" />
            </button>
        </div>
    )
}

export default CallControls