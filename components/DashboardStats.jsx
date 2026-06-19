import React from 'react'
import { useMemo } from 'react'
import { Activity, Calendar, CheckCircle2, Clock } from "lucide-react"

function formatAvgDuration(sec) {
    if (!sec) return "0s";
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

const DashboardStats = ({ calls = [], loading }) => {
    const stats = useMemo(() => {
        const completed = calls.filter((c) => c.status === "COMPLETED").length;
        const totalSec = calls.reduce((sum, c) => sum + (c.duration || 0), 0)
        const now = new Date()
        const thisMonth = calls.filter((c) => {
            const d = new Date(c.createdAt)
            return (
                d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
            )
        }).length


        return [
            {
                title: "Total",
                value: calls.length,
                desc: "Consultations",
                icon: Activity,
            },
            {
                title: "Completed",
                value: completed,
                desc: "Saved reports",
                icon: CheckCircle2,
            },
            {
                title: "Avg. time",
                value: formatAvgDuration(
                    calls.length ? Math.round(totalSec / calls.length) : 0
                ),
                desc: "Per session",
                icon: Clock,
            },
            {
                title: "This month",
                value: thisMonth,
                desc: "Sessions",
                icon: Calendar,
            },
        ];

    }, [calls])


    if (loading) {
        return (
            <div className="stats stats-vertical lg:stats-horizontal w-full rounded-2xl bg-linear-to-br from-info/30 via-info/15 to-transparent animate-pulse">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="stat px-6 py-4">
                        <div className="stat-figure h-8 w-8 bg-base-200/80 rounded-lg" />
                        <div className="stat-title h-3 w-16 bg-base-200/80 rounded mt-2" />
                        <div className="stat-value h-8 w-12 bg-base-200/80 rounded mt-2" />
                    </div>
                ))}
            </div>
        );
    }


    return (
        <div className='stats stats-vertical lg:stats-horizontal w-full rounded-2xl bg-linear-to-br from-info/20 via-info/15 to-transparent'>
            {stats.map(({ title, value, desc, icon: Icon }) => (
                <div key={title} className="stat px-6 py-4">
                    <div className="stat-figure text-info">
                        <div className="size-10 rounded-xl bg-info/10 flex items-center justify-center">
                            <Icon className="size-5" strokeWidth={2} />
                        </div>
                    </div>

                    <div className="stat-title text-base-content/60 font-semibold">
                        {title}
                    </div>
                    <div className="stat-value text-info">{value}</div>
                    <div className="stat-desc text-base-content/50">{desc}</div>
                </div>
            ))}
        </div>
    )
}

export default DashboardStats