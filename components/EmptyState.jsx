import React from "react";

export default function EmptyState({ icon, title, description, button, className = "" }) {
    return (
        <div className={`card bg-linear-to-b from-info/5 to-transparent rounded-2xl overflow-hidden ${className}`}>
            <div className="card-body items-center text-center py-16 space-y-3">
                <div className="size-16 rounded-2xl bg-info/10 flex items-center justify-center">
                    {icon}
                </div>
                <h3 className="text-xl font-bold tracking-tight">{title}</h3>
                <p className="text-xs text-base-content/50 max-w-xs leading-relaxed">
                    {description}
                </p>
                {button && (button.href ? (
                    <a href={button.href} className={`btn btn-info btn-sm rounded-xl mt-2 ${button.className || ""}`}>
                        {button.text}
                    </a>
                ) : (
                    <button type="button" onClick={button.onClick} className={`btn btn-info btn-sm rounded-xl mt-2 ${button.className || ""}`}>
                        {button.text}
                    </button>
                ))}
            </div>
        </div>
    );
}