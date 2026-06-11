"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Stethoscope, Sparkles, Banknote } from "lucide-react"
import { useClerk, UserButton, useUser } from "@clerk/nextjs"
import { div } from "framer-motion/client"

const Navbar = () => {

    const { user } = useUser()
    const { openSignIn } = useClerk()
    const pathname = usePathname()


    return (
        <div className="navbar backdrop-blur-md sticky top-0 z-50 py-3">
            <div className="navbar-start gap-2">
                {/* Mobile Navbar */}
                <div className="dropdown md:hidden">
                    <div tabIndex={0} role="button" className="btn btn-info btn-outline btn-square rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4
                    6h16M4 12h16M4 18h7"/></svg>
                    </div>
                    <ul tabIndex={-1} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><Link href="/doctors">Doctors</Link></li>
                        <li><Link href="/dashboard">Pricing</Link></li>
                        {user && (<li><Link href="/dashboard">Dashboard</Link></li>)}
                    </ul>
                </div>
                {/* LOGO */}
                <Link href="/" className="flex items0center gap-1 select-none group">
                    <div className="bg-info/10 flexCenter h-9 w-9 rounded-xl text-info border border-info/10 shadow-xs">
                        <Sparkles className="size-4 animate-pulse" />
                    </div>
                    <h3>
                        <span className="text-base-content font-extrabold tracking-tight">Med</span>
                        <span className="text-info font-black tracking-tight">ify</span>
                    </h3>
                </Link>
            </div>
            {/* Navlinks - Desktop */}
            <div className="navbar-center hidden md:flex gap-4 p-1.5 rounded-full border border-info/30">
                <Link href="/doctors" className={`btn btn-info btn-sm transition-all gap-1.5 ${pathname === '/doctors' ? 'btn-active' : 'btn-outline border border-info/30 shadow-none'}`}>
                    <Stethoscope className="size-4 stroke-[1.8]" />
                    Doctors
                </Link>
                <Link href="/pricing" className={`btn btn-info btn-sm transition-all gap-1.5 ${pathname === '/pricing' ? 'btn-active' : 'btn-outline border border-info/30 shadow-none'}`}>
                    <Banknote className="size-4 stroke-[1.8]" />
                    Pricing
                </Link>
                {user && (
                    <Link href="/dashboard" className={`btn btn-info btn-sm transition-all gap-1.5 ${pathname === '/dashboard' ? 'btn-active' : 'btn-outline border border-info/30 shadow-none'}`}>
                        <LayoutDashboard className="size-4 stroke-[1.8]" />
                        Dashboard
                    </Link>
                )}
            </div>
            {/* Login buttons */}
            <div className="navbar-end gap-2">
                {!user ? (
                    <button
                        onClick={() => openSignIn()}
                        type="button" className="btn btn-info text-content btn-sm rounded-full px-5">
                        Sign In
                    </button>
                ) : (
                    <div className="avatar ring-2 ring-info/10 rounded-full p-0.5">
                        <UserButton afterSignOutUrl="/" />
                    </div>
                )}
            </div>
        </div>

    )
}

export default Navbar