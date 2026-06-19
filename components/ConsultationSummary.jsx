import { div, p, section } from "framer-motion/client";
import {
    ClipboardList,
    FileText,
    Pill,
    SheildAlert,
    ShieldAlert,
    Stethoscope
} from "lucide-react"

const ConsultationSummary = ({ call }) => {
    if (!call) return null

    const meta = call?.metadata || {};
    const isPending = meta.source === "pending" || call.status === "PROCESSING"

    return (
        <div className="space-y-4 text-left">
            {isPending && (
                <p className="text-sm text-warning font-medium bg-warning/10 border border-warning/20 rounded-xl px-4">
                    Consultation analysis is still processing. This view will update automatically
                </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <MetricCard
                    icon={FileText}
                    label="Primary Complaint"
                    value={meta.complaint}
                />
                <MetricCard
                    icon={ShieldAlert}
                    label="Severity"
                    value={meta.severity}
                />
                <MetricCard
                    icon={ClipboardList}
                    label="Clinical Summary"
                    value={meta.summary}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <MetricCard
                        icon={Pill}
                        label="Medications Guidance"
                        value={meta.medications}
                    />
                    <MetricCard label="Recommendations" value={meta.recommendation} />
                </div>
                {call.transcript && (
                    <section className="bg-base-100 border border-base-200/60 rounded-xl p-4 space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-base-content/50 flex items-center gap-1.5">
                            <Stethoscope className="size-3.5 text-info" />
                            Raw Transcript</h4>
                        <div className="max-5-48 overflow-y-auto text-xs md:text-sm leading-relaxed text-base-content/80 whitespace-pre-line">
                            {call.transcript}</div>
                    </section>
                )}

            </div>
        </div>
    )
}

function MetricCard({ icon: Icon, label, value, full }) {
    return (
        <div className={`bg-base-100 border border-base-200/60 p-4 rounded-xl space-y-1 ${full ? "sm:col-span-2" : ""}`}>
            <span className="text-[10px] font-bold text-base-content/45 uppercase tracking-wider flex items-center gap-1">
                {Icon && <Icon className="size-3.5 text-info" />}
                {label}
            </span>
            <p className="text-sm text-base-content/85 leading-relaxed">
                {value || "Not available"}</p>
        </div>
    )
}

export default ConsultationSummary