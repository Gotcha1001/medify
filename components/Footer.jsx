"use client"
import Link from 'next/link'
import React from 'react'

// Colors from screenshot:
// Page/footer bg: #EAF4FB (light sky blue)
// Card bg: #FFFFFF
// Primary CTA: #00BFEA (cyan-blue)
// Text dark: #1A2B3C
// Text muted: #6B7A8D
// Disclaimer banner: #FEF9EC (pale amber)
// Emergency card: #FF3366
// Border/divider: #D0E8F5

const Footer = () => {
    return (
        <footer style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#EAF4FB', borderRadius: '20px' }}>

            {/* Medical Disclaimer Banner */}
            <div style={{ backgroundColor: '#a3e6f0', borderRadius: '20px' }} className="py-3 px-6">
                <div className="max-w-6xl mx-auto flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 mt-0.5" style={{ color: '#1082c9' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    </svg>
                    <p className="text-xs leading-relaxed" style={{ color: '#1ca6d9' }}>
                        <span className="font-semibold">Medical Disclaimer:</span> This AI voice agent provides general health information only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for medical decisions.
                    </p>
                </div>
            </div>

            {/* Main Footer Grid */}
            <div className="max-w-6xl mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand Column */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00BFEA' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                            </div>
                            <span className="font-bold text-lg" style={{ color: '#1A2B3C' }}>MediVoice AI</span>
                        </div>
                        <p className="text-sm leading-relaxed mb-4" style={{ color: '#6B7A8D' }}>
                            Your AI-powered health companion. Available 24/7 to guide, listen, and support your wellness journey.
                        </p>
                        <div
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                            style={{ border: '1.5px solid #00BFEA', color: '#00BFEA', backgroundColor: 'transparent' }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#00BFEA' }}></span>
                            Agent Online
                        </div>
                    </div>

                    {/* Features */}
                    <div className='flex flex-col gap-2'>
                        <h6 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#9AA5B4' }}>Features</h6>

                        <Link className='text-blue-500' href="/doctors">Doctors</Link>
                        <Link className='text-blue-500' href="/pricing">Pricing</Link>

                    </div>

                    {/* Support */}
                    <div>
                        <h6 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#9AA5B4' }}>Support</h6>
                        <ul className="space-y-2.5">
                            {['Help Center', 'Privacy Policy', 'Terms of Service', 'HIPAA Compliance', 'Contact Us'].map(item => (
                                <li key={item}>
                                    <a className="text-sm cursor-pointer transition-colors duration-150" style={{ color: '#4A5568' }}
                                        onMouseEnter={e => e.target.style.color = '#00BFEA'}
                                        onMouseLeave={e => e.target.style.color = '#4A5568'}>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Emergency */}
                    <div>
                        <h6 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#9AA5B4' }}>Emergency</h6>
                        <div className="rounded-2xl p-4 mb-4 flex items-start gap-3" style={{ backgroundColor: '#1541f1' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <div>
                                <p className="text-sm font-bold text-white">Life-threatening emergency?</p>
                                <p className="text-xs text-white/90 mt-0.5">Call <strong>911</strong> immediately</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2.5">
                            {[
                                { label: 'HIPAA Compliant', d: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
                                { label: 'End-to-End Encrypted', d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
                                { label: 'Available 24 / 7', d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                            ].map(({ label, d }) => (
                                <div key={label} className="flex items-center gap-2 text-sm" style={{ color: '#6B7A8D' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" style={{ color: '#00BFEA' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
                                    </svg>
                                    {label}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Bar */}
            <div style={{ borderTop: '1px solid #D0E8F5' }}>
                <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-center sm:text-left" style={{ color: '#9AA5B4' }}>
                        © {new Date().getFullYear()} MediVoice AI. All rights reserved. Not a licensed medical service.
                    </p>
                    <div className="flex gap-2">
                        {['SOC 2', 'HIPAA'].map(badge => (
                            <div key={badge} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
                                style={{ border: '1px solid #9AA5B4', color: '#9AA5B4' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                {badge}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </footer>
    )
}

export default Footer