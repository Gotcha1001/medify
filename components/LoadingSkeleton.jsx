import React from 'react'

function LoadingSkeleton({ count = 6, variant = "card", gridCols = "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3", className = "", }) {

    if (variant === "card") {
        return (
            <div className={`grid ${gridCols} gap-5 ${className}`}>
                {[...Array(count)].map((_, i) => (
                    <div key={i} className="bg-linear-to-b from-base-200/40 via-base-100 to-base-100 border border-base-200/40 rounded-2xl p-5 space-y-4" >
                        <div className="flex gap-4 items-center">
                            <div className="skeleton size-14 rounded-2xl" />
                            <div className="flex-1 space-y-2">
                                <div className="skeleton h-4 rounded-md" />
                                <div className="skeleton h-3 rounded-md" />
                            </div>
                        </div>
                        <div className="space-y-2 pt-1">
                            <div className="skeleton h-3 rounded-md" />
                            <div className="skeleton h-3 rounded-md" />
                        </div>
                        <div className="skeleton h-10 rounded-xl mt-2" />
                    </div>
                ))}
            </div>
        )
    }
    if (variant === "table-row") {
        return (
            <div className={`space-y-3 ${className}`}>
                {[...Array(count)].map((_, i) => (
                    <div key={i} className="skeleton h-11 rounded-xl" />
                ))}
            </div>
        );
    }

    if (variant === "list-item") {
        return (
            <div className={`space-y-4 ${className}`}>
                {[...Array(count)].map((_, i) => (
                    <div key={i} className="skeleton h-20 rounded-xl border border-base-200/40" />
                ))}
            </div>
        );
    }
    if (variant === "detail") {
        return (
            <div className={`max-w-3xl py-12 space-y-8 ${className}`}>
                <div className="flexCenter flex-col sm:flex-row gap-6">
                    <div className="skeleton size-32 rounded-full" />
                    <div className="flex-1 space-y-3 w-full sm:w-auto">
                        <div className="skeleton h-8 rounded-md w-1/2 mx-auto sm:mx-0" />
                        <div className="skeleton h-4 rounded-md w-1/3 mx-auto sm:mx-0" />
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="skeleton h-4 rounded-md" />
                    <div className="skeleton h-4 rounded-md w-5/6" />
                </div>
            </div>
        );
    }


}

export default LoadingSkeleton