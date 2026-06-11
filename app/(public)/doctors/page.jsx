"use client"
import { useEffect } from "react"
import DoctorCard from "@/components/DoctorCard"
import Title from "@/components/Title"
import EmptyState from "@/components/EmptyState"
import LoadingSkeleton from "@/components/LoadingSkeleton"
import { useDoctorStore } from "@/lib/zustand/doctorStore"
import { LayoutGrid, Sparkles, Stethoscope } from "lucide-react"
import { div } from "framer-motion/client"


const DoctorsPage = () => {

    const { isLoading, error, fetchDoctors, filteredDoctors, specialities, specialityFilter, setSpecialityFilter } = useDoctorStore()

    useEffect(() => {
        fetchDoctors()
    }, [fetchDoctors])

    const doctors = filteredDoctors()
    const specialityList = specialities()

    return (
        <div>
            <Title
                headingStart="Specialist"
                headingEnd="Agents"
                subtext="Choose a specialist for a voice consultation. Free doctors are available to everyone; Premium doctors require an active subscription"
            />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
                {/* LEFT SIDEBAR: Standarized Dynamic Menu List Controls */}
                <aside className="lg:col-span-3 space-y-4 lg:sticky lg:top-24">
                    <div className="flex items-center gap-2 px-1 text-base-content/80">
                        <Sparkles className="size-4 text-info" />
                        <span className="text-xs font-bold uppercase tracking-wider">Speciality Filters</span>
                    </div>
                    <div className="menu border border-info/10 rounded-2xl p-2 gap-1 w-full">
                        <button
                            onClick={() => setSpecialityFilter("all")}
                            className={`btn btn-sm btn-info justify-start ${specialityFilter === "all" ? "btn-active" : "btn-soft"}`}
                        >
                            <LayoutGrid className="size-4" />
                            All Specialities

                        </button>
                        {specialityList.map((s) => (
                            <button
                                key={s}
                                onClick={() => setSpecialityFilter(s)}
                                className={`btn btn-sm btn-info justify-start ${specialityFilter === s ? "btn-active" : "btn-soft"}`}
                            >{s}</button>
                        ))}
                    </div>
                </aside>
                {/* Right side - Doctors */}
                <main className="lg:col-span-9 space-y-8 w-full">
                    {/* SKELETON PLACEHOLDER LOADING STATE */}
                    {isLoading && <LoadingSkeleton variant="card" count={6} />}

                    {/* CRITICAL FEEDBACK EXCEPTION */}
                    {error && (
                        <div role="alert" className="alert alert-error rounded-2xl shadow-sm border border-error/20">
                            <span className="text-sm font-semibold">{error}</span>
                        </div>
                    )}
                    {/* EMPTY MATCH EXCEPTION */}
                    {!isLoading && doctors.length === 0 && (
                        <EmptyState
                            icon={<Stethoscope className="size-7 text-info" />}
                            title="No specialists found"
                            description="Try adjusting your category selection metrics above to explore other wellness agents"
                        />
                    )}

                    {/* Doctors */}
                    {!isLoading && doctors.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                            {doctors.map((doctor) => (
                                <DoctorCard key={doctor.slug} doctor={doctor} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}

export default DoctorsPage