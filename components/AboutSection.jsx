// import React from 'react'
// import { ShieldCheck, Users, Zap, ArrowRight, Activity, BrainCircuit } from 'lucide-react'
// import Link from 'next/link'
// import Title from "./Title"

// const corePillars = [
//     { icon: BrainCircuit, title: "Clinical Intelligence", metric: "200+ Agents" },
//     { icon: ShieldCheck, title: "Secure Orchestration", metric: "99.9% Uptime" }
// ]

// const AboutSection = () => {
//     return (
//         <section className='max-w-7xl mx-auto px-6 pt-28'></section>
//     )
// }

// export default AboutSection

"use client"
import { Users, Zap, Activity, ArrowRight, Brain, Shield, Clock } from "lucide-react";
import { useState } from "react";

const corePillars = [
    {
        icon: Brain,
        title: "AI-Powered Diagnostics",
        metric: "94.2% Accuracy",
    },
    {
        icon: Shield,
        title: "HIPAA Compliant",
        metric: "256-bit Encrypted",
    },
    {
        icon: Clock,
        title: "Real-Time Analysis",
        metric: "< 2s Response",
    },
];

// Reusable Title component
function Title({ headingStart, headingEnd, subtext }) {
    return (
        <div className="space-y-3">
            <h2 className="text-4xl font-bold tracking-tight leading-tight text-base-content">
                {headingStart}{" "}
                <span className="text-info">{headingEnd}</span>
            </h2>
            {subtext && (
                <p className="text-base text-base-content/60 leading-relaxed max-w-md">
                    {subtext}
                </p>
            )}
        </div>
    );
}

export default function AboutSection() {
    return (
        <section className="max-w-7xl mx-auto px-6 pt-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* Left Side: Strategic Overview */}
                <div className="lg:col-span-5 space-y-6">
                    {/* Badge */}
                    <span className="badge badge-info badge-sm badge-outline gap-1 font-semibold">
                        <span className="size-1 rounded-full bg-info" />
                        The Future of Medicine
                    </span>

                    {/* Title */}
                    <Title
                        headingStart="Healthcare Reimagined with"
                        headingEnd="Intelligent Agents"
                        subtext="We combine cutting-edge artificial intelligence with specialized clinical expertise to deliver accessible, deeply personalized healthcare protocols—anytime, anywhere."
                    />

                    {/* Core Pillars */}
                    <div className="space-y-3">
                        {corePillars.map((pillar, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between p-5 rounded-xl badge badge-info badge-soft w-full"
                            >
                                <div className="flex items-center gap-3">
                                    <pillar.icon className="size-4 text-info" />
                                    <span className="text-sm font-medium text-base-content">
                                        {pillar.title}
                                    </span>
                                </div>
                                <span className="badge badge-sm badge-info badge-outline">
                                    {pillar.metric}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* CTA Link */}
                    <a href="/doctors" className="btn btn-info btn-sm rounded-lg gap-2 normal-case">
                        Explore Medical Agents
                        <ArrowRight className="size-3" />
                    </a>
                </div>

                {/* Right Side: Clean Metrics & Node Panel with Info Gradients */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* Main Panel with Info Gradient */}
                    <div className="sm:col-span-2 p-5 rounded-2xl border border-base-200/50 bg-linear-to-br from-info/30 via-info/15 to-transparent space-y-3">
                        <div className="flex items-center justify-between border-b border-base-200/50 pb-2">
                            <div className="flex items-center gap-2">
                                <Activity className="size-4 text-info" />
                                <span className="text-xs font-semibold text-base-content">
                                    Active Diagnosis Node
                                </span>
                            </div>
                            <span className="size-1.5 rounded-full bg-success" />
                        </div>
                        <p className="text-xs font-mono text-base-content/70">
              // Symptoms: Acute tension headache, 72h. Confidence: 94.2%
                        </p>
                    </div>

                    {/* Stat 1 with subtle Info Gradient */}
                    <div className="p-5 rounded-2xl border border-base-200/50 bg-linear-to-br from-info/30 via-info/15 to-transparent">
                        <Users className="size-4 text-info mb-4" />
                        <p className="text-3xl font-bold tracking-tight text-base-content">
                            50K+
                        </p>
                        <p className="text-[10px] uppercase font-semibold tracking-wider text-base-content/40 mt-1">
                            Patients Served
                        </p>
                    </div>

                    {/* Stat 2 with subtle Info Gradient */}
                    <div className="p-5 rounded-2xl border border-base-200/50 bg-linear-to-br from-info/30 via-info/15 to-transparent">
                        <Zap className="size-4 text-info mb-4" />
                        <p className="text-3xl font-bold tracking-tight text-base-content">
                            24/7
                        </p>
                        <p className="text-[10px] uppercase font-semibold tracking-wider text-base-content/40 mt-1">
                            Instant Response
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}