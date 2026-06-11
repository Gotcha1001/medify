// import React from 'react'
// import Link from 'next/link'
// import Image from 'next/image'
// import { Mic, Shield, Calendar, PhoneOff, Video, Star, Sparkels, Sparkles } from 'lucide-react'
// const Hero = () => {
//     return (
//         <section className='relative overflow-hidden rounded-3xl bg-linear-to-tr from-info/20 to-info/5 p-6 lg:px-16 min-h-[85vh] flex items-center'>
//             <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto'>
//                 {/* Left side - content */}
//                 <div className='lg:col-span-7 space-y-6 text-center lg:text-left flex flex-col lg:items-start items-center'>
//                     <div className='badge badge-md md:badge-lg bg-white/50 border-white/40 text-base-content/80 backdrop-blur-md gap-2 py-4 px-5 shadow-xs'>
//                         <Sparkles className='size-3.5 text-info animate-pulse' />
//                         Personalized AI Medical Services
//                     </div>
//                     <h1 className='bg-linear-to-r from-base-content via-base-content to-base-content/60 bg-clip-text text-transparent leading-[1.1] tracking tight'>Personalized <br className='hidden md:inline' />     Medical Services <br />
//                         <span className='text-info font-extrabold'>for Better Health</span>
//                     </h1>
//                     <p className='max-w-xl'>These services represent a diverse range of medical solutions to cater to or different real special health. Start free, update for premium specialists</p>
//                     <div className='flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4 w-full'>
//                         <Link href="/doctors" className='btn btn-info text-info-content btn-lg rounded-full px-8 shadow-xl shadow-info/20 gap-2.5'>
//                             <Calendar className='size-5' />
//                             Consult Doctor
//                         </Link>
//                         <Link href="/pricing" className='btn btn-info btn-soft btn-lg rounded-full px-8 shadow shadow-info/20 backdrop-blur-md gap-2.5'>
//                             <Shield className='size-5' />
//                             View Plans
//                         </Link>

//                         {/* Right side */}
//                         <div className='lg:col-span-5 flexCenter w-full py-6'>
//                             <div className='relative w-75 md-w-111 h-100 md:h-144 flex-none'>
//                                 {/* Image frame */}
//                                 <div className='w-full h-full rounded-[3.1rem] p-2 bg-white/30 backdrop-blur-xs border border-white/50 shadow-3xl ring-4 ring-info/5'>
//                                     <div className='w-full h-full rounded-[2.5rem] overflow-hidden border border-white/40 bg-info'>
//                                         <Image src="/bg.png" alt='Heo' width={774} height={999} priority className='w-full h-full object-cover contrast-[1.02]' />
//                                     </div>
//                                 </div>

//                             </div>
//                             {/* HUD CARD: Audio Voice calling Panel */}
//                             <div>
//                                 <div>
//                                     <div>
//                                         <Mic className='size-4.5 animate-pulse' />
//                                     </div>
//                                 </div>
//                                 <h6>Calling...</h6>
//                                 <span>Dr. Sarah Chen</span>
//                             </div>
//                         </div>
//                         <div><button><Video className='size-3' /></button>
//                             <button><PhoneOff className='size-3' /></button>
//                         </div>
//                         {/* HUD CARD: Trust Verification Strip */}
//                         <div className='absolute top-14 md:top-1/4 -right-12 bg-white/90 border border-white/40 badge-lg h-auto rounded-xl py-2 px-3 md:py-2.5 md:px-3.5 shadow-md flex items-center gap-2 md:gap-3 backdrop-blur-md z-10'>
//                             <div className='avatar-group -space-x-3'>
//                                 <div className='avatar placeholder size-7 md:size-9'>
//                                     <img src={`https://i.pravatar.cc/100?img=11`} alt="Doctor" />
//                                 </div>
//                                 <div className='avatar placeholder size-7 md:size-9'>
//                                     <img src={`https://i.pravatar.cc/100?img=21`} alt="Doctor" />
//                                 </div>
//                                 <div className='text-[9px] md:text-[10px] font-bold leading-tight text-left'>
//                                     <div className='flex items-center text-amber-500 gap-0.5'>
//                                         <Star className='size-2 md:size-2.5 fill-current' />
//                                         4.9
//                                         <span className='text-base-content/50 font-normal'>Care Specialist Experts</span>
//                                     </div>
//                                 </div>       {/* HUD CARD: Lab Telemetry Chart */}
//                                 <div className="absolute bottom-36 -left-3 md:-left-11 bg-white/90 border border-white/40 rounded-2xl p-3 md:p-4 shadow-lg w-40 md:w-48 space-y-2 backdrop-blur-md z-10">
//                                     <div className="text-left">
//                                         <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider block opacity-70">Mitochondrial Test</span>
//                                         <span className="text-[8px] md:text-[9px] opacity-40">Small lab chart • 1 chart</span>
//                                     </div>
//                                     <div className="h-10 md:h-12 flex items-end gap-1 md:gap-1.5 pt-2 justify-center border-t border-base-100/50">
//                                         <div className="w-2.5 md:w-3 bg-info/20 h-4 md:h-5 rounded-xs animate-pulse" />
//                                         <div className="w-2.5 md:w-3 bg-info/40 h-6 md:h-8 rounded-xs" />
//                                         <div className="w-2.5 md:w-3 bg-info h-9 md:h-12 rounded-xs animate-pulse" />
//                                         <div className="w-2.5 md:w-3 bg-sky-400 h-5 md:h-7 rounded-xs" />
//                                         <div className="w-2.5 md:w-3 bg-sky-400/30 h-3 md:h-4 rounded-xs" />
//                                     </div>
//                                 </div>
//                             </div>

//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default Hero




'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Mic, Shield, Calendar, PhoneOff, Video, Star, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

// Reusable variants
const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }
    })
}

const fadeIn = {
    hidden: { opacity: 0, scale: 0.92 },
    show: (delay = 0) => ({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }
    })
}

const slideIn = (x = 0, y = 0, delay = 0) => ({
    hidden: { opacity: 0, x, y, scale: 0.95 },
    show: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }
    }
})

const Hero = () => {
    return (
        <section className='relative overflow-hidden rounded-3xl bg-linear-to-tr from-info/20 to-info/5 p-6 lg:px-16 min-h-[85vh] flex items-center'>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto'>

                {/* Left side - content */}
                <div className='lg:col-span-7 space-y-6 text-center lg:text-left flex flex-col lg:items-start items-center'>

                    {/* Badge */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        custom={0}
                        className='badge badge-md md:badge-lg bg-white/50 border-white/40 text-base-content/80 backdrop-blur-md gap-2 py-4 px-5 shadow-xs'
                    >
                        <Sparkles className='size-3.5 text-info animate-pulse' />
                        Personalized AI Medical Services
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        custom={0.1}
                        className='bg-linear-to-r from-base-content via-base-content to-base-content/60 bg-clip-text text-transparent leading-[1.1] tracking-tight'
                    >
                        Personalized <br className='hidden md:inline' />
                        Medical Services <br />
                        <span className='text-info font-extrabold'>for Better Health</span>
                    </motion.h1>

                    {/* Body text */}
                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        custom={0.2}
                        className='max-w-xl'
                    >
                        These services represent a diverse range of medical solutions to cater to or different real special health. Start free, upgrade for premium specialists
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        custom={0.3}
                        className='flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4 w-full'
                    >
                        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                            <Link href="/doctors" className='btn btn-info text-info-content btn-lg rounded-full px-8 shadow-xl shadow-info/20 gap-2.5'>
                                <Calendar className='size-5' />
                                Consult Doctor
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                            <Link href="/pricing" className='btn btn-info btn-soft btn-lg rounded-full px-8 shadow shadow-info/20 backdrop-blur-md gap-2.5'>
                                <Shield className='size-5' />
                                View Plans
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Right side */}
                <div className='lg:col-span-5 flex justify-center w-full py-6'>
                    <div className='relative w-75 md:w-111 h-100 md:h-144 flex-none'>

                        {/* Image frame */}
                        <motion.div
                            variants={fadeIn}
                            initial="hidden"
                            animate="show"
                            custom={0.2}
                            className='w-full h-full rounded-[3.1rem] p-2 bg-white/30 backdrop-blur-xs border border-white/50 shadow-3xl ring-4 ring-info/5'
                        >
                            <div className='w-full h-full rounded-[2.5rem] overflow-hidden border border-white/40 bg-info'>
                                <Image
                                    src="/bg.png"
                                    alt='Hero'
                                    width={774}
                                    height={999}
                                    priority
                                    className='w-full h-full object-cover contrast-[1.02]'
                                />
                            </div>
                        </motion.div>

                        {/* HUD CARD: Trust Verification Strip */}
                        <motion.div
                            variants={slideIn(30, 0, 0.5)}
                            initial="hidden"
                            animate="show"
                            whileHover={{ scale: 1.04, y: -2 }}
                            className='absolute top-14 md:top-1/4 -right-12 bg-white/90 border border-white/40 h-auto rounded-xl py-2 px-3 md:py-2.5 md:px-3.5 shadow-md flex items-center gap-2 md:gap-3 backdrop-blur-md z-10'
                        >
                            <div className='avatar-group -space-x-3'>
                                <div className='avatar placeholder size-7 md:size-9'>
                                    <img src={`https://i.pravatar.cc/100?img=11`} alt="Doctor" />
                                </div>
                                <div className='avatar placeholder size-7 md:size-9'>
                                    <img src={`https://i.pravatar.cc/100?img=21`} alt="Doctor" />
                                </div>
                            </div>
                            <div className='text-[9px] md:text-[10px] font-bold leading-tight text-left'>
                                <div className='flex items-center text-amber-500 gap-0.5'>
                                    <Star className='size-2 md:size-2.5 fill-current' />
                                    4.9
                                </div>
                                <span className='text-base-content/50 font-normal'>Care Specialist Experts</span>
                            </div>
                        </motion.div>

                        {/* HUD CARD: Lab Telemetry Chart */}
                        <motion.div
                            variants={slideIn(-30, 0, 0.6)}
                            initial="hidden"
                            animate="show"
                            whileHover={{ scale: 1.04, y: -2 }}
                            className="absolute bottom-36 -left-3 md:-left-11 bg-white/90 border border-white/40 rounded-2xl p-3 md:p-4 shadow-lg w-40 md:w-48 space-y-2 backdrop-blur-md z-10"
                        >
                            <div className="text-left">
                                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider block opacity-70">Mitochondrial Test</span>
                                <span className="text-[8px] md:text-[9px] opacity-40">Small lab chart • 1 chart</span>
                            </div>
                            <div className="h-10 md:h-12 flex items-end gap-1 md:gap-1.5 pt-2 justify-center border-t border-base-100/50">
                                {[
                                    { bg: 'bg-info/20', h: 'h-4 md:h-5', pulse: true },
                                    { bg: 'bg-info/40', h: 'h-6 md:h-8', pulse: false },
                                    { bg: 'bg-info', h: 'h-9 md:h-12', pulse: true },
                                    { bg: 'bg-sky-400', h: 'h-5 md:h-7', pulse: false },
                                    { bg: 'bg-sky-400/30', h: 'h-3 md:h-4', pulse: false },
                                ].map((bar, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scaleY: 0 }}
                                        animate={{ scaleY: 1 }}
                                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.75 + i * 0.07 }}
                                        style={{ transformOrigin: 'bottom' }}
                                        className={`w-2.5 md:w-3 ${bar.bg} ${bar.h} rounded-xs ${bar.pulse ? 'animate-pulse' : ''}`}
                                    />
                                ))}
                            </div>
                        </motion.div>

                        {/* HUD CARD: Audio Voice Calling Panel */}
                        <motion.div
                            variants={slideIn(0, 20, 0.7)}
                            initial="hidden"
                            animate="show"
                            whileHover={{ scale: 1.04, y: -2 }}
                            className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white/90 border border-white/40 rounded-2xl p-3 md:p-4 shadow-lg backdrop-blur-md z-10 flex items-center gap-3 w-52 md:w-60"
                        >
                            <div className="bg-info/10 rounded-full p-2">
                                <Mic className='size-4.5 text-info animate-pulse' />
                            </div>
                            <div className="flex-1 text-left">
                                <h6 className="text-[10px] font-bold">Calling...</h6>
                                <span className="text-[9px] opacity-60">Dr. Sarah Chen</span>
                            </div>
                            <div className="flex gap-1.5">
                                <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} className="btn btn-circle btn-xs bg-info/10 border-0">
                                    <Video className='size-3 text-info' />
                                </motion.button>
                                <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} className="btn btn-circle btn-xs bg-error/10 border-0">
                                    <PhoneOff className='size-3 text-error' />
                                </motion.button>
                            </div>
                        </motion.div>

                    </div>
                </div>

            </div>
        </section>
    )
}

export default Hero