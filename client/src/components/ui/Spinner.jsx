"use client";

const Spinner = ({ size = "md", color = "primary", variant = "spinner" }) => {
    const sizes = {
        xs: "w-3 h-3",
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
        xl: "w-12 h-12",
    };

    const colors = {
        primary: "text-primary-600",
        white: "text-white",
        inherit: "text-current",
    };

    if (variant === "dots") {
        return (
            <div className="flex items-center gap-1">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className={`${sizes[size]} rounded-full ${colors[color]} bg-current animate-pulse`}
                        style={{ animationDelay: `${i * 150}ms` }}
                    />
                ))}
            </div>
        );
    }

    if (variant === "pulse") {
        return (
            <div
                className={`${sizes[size]} rounded-full ${colors[color]} bg-current animate-pulse`}
            />
        );
    }

    // Default spinner variant
    return (
        <svg
            className={`animate-spin ${sizes[size]} ${colors[color]}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            ></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
    );
};

export default Spinner;
