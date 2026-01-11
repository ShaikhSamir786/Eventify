"use client";

const Badge = ({
    children,
    variant = "default",
    size = "md",
    dot = false,
    removable = false,
    onRemove,
    className = "",
}) => {
    const baseStyles =
        "inline-flex items-center font-medium rounded-full transition-smooth";

    const variants = {
        default: "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100",
        success: "bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-100",
        warning: "bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-100",
        error: "bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-100",
        info: "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100",
    };

    const sizes = {
        sm: "px-2 py-0.5 text-xs gap-1",
        md: "px-2.5 py-1 text-sm gap-1.5",
        lg: "px-3 py-1.5 text-base gap-2",
    };

    return (
        <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
            {dot && (
                <span
                    className={`w-1.5 h-1.5 rounded-full ${variant === "default"
                            ? "bg-neutral-500"
                            : variant === "success"
                                ? "bg-success-500"
                                : variant === "warning"
                                    ? "bg-warning-500"
                                    : variant === "error"
                                        ? "bg-error-500"
                                        : "bg-primary-500"
                        }`}
                />
            )}
            {children}
            {removable && (
                <button
                    onClick={onRemove}
                    className="ml-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-full p-0.5 transition-smooth focus-ring"
                    aria-label="Remove badge"
                >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            )}
        </span>
    );
};

export default Badge;
