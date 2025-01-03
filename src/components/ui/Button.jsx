import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-indigo-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button className={`px-4 py-2 rounded-lg hover:bg-indigo-700 focus:ring-2 ring-indigo-600 ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
}
