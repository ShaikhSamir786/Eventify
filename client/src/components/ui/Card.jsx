"use client";

const Card = ({
    children,
    variant = "default",
    hoverable = false,
    clickable = false,
    className = "",
    header,
    footer,
    ...props
}) => {
    const baseStyles = "rounded-xl transition-smooth";

    const variants = {
        default: "bg-surface border border-border",
        elevated: "bg-surface-elevated shadow-lg",
        outlined: "bg-transparent border-2 border-border",
        glass: "glass border border-white/10",
    };

    const interactiveStyles =
        hoverable || clickable
            ? "hover-lift cursor-pointer hover:border-primary-300 dark:hover:border-primary-700"
            : "";

    return (
        <div
            className={`${baseStyles} ${variants[variant]} ${interactiveStyles} ${className}`}
            {...props}
        >
            {header && (
                <div className="px-6 py-4 border-b border-border">
                    {typeof header === "string" ? (
                        <h3 className="text-lg font-semibold text-foreground">{header}</h3>
                    ) : (
                        header
                    )}
                </div>
            )}

            <div className="p-6">{children}</div>

            {footer && (
                <div className="px-6 py-4 border-t border-border bg-neutral-50 dark:bg-neutral-900 rounded-b-xl">
                    {footer}
                </div>
            )}
        </div>
    );
};

export default Card;
