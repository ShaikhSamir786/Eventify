"use client";

import { forwardRef } from "react";

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      loading = false,
      disabled = false,
      icon = null,
      iconPosition = "left",
      className = "",
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-smooth focus-ring disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-gradient-to-r from-primary-600 to-secondary-500 text-white hover:from-primary-700 hover:to-secondary-600 shadow-md hover:shadow-lg active:scale-95",
      secondary:
        "bg-surface-elevated text-foreground border border-border hover:border-border-hover hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-95",
      outline:
        "bg-transparent text-primary-600 dark:text-primary-400 border-2 border-primary-600 dark:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950 active:scale-95",
      ghost:
        "bg-transparent text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-95",
      danger:
        "bg-error-600 text-white hover:bg-error-700 shadow-md hover:shadow-lg active:scale-95",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm rounded-md gap-1.5",
      md: "px-4 py-2 text-base rounded-lg gap-2",
      lg: "px-6 py-3 text-lg rounded-xl gap-2.5",
    };

    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
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
        )}
        {!loading && icon && iconPosition === "left" && (
          <span className="flex-shrink-0">{icon}</span>
        )}
        <span>{children}</span>
        {!loading && icon && iconPosition === "right" && (
          <span className="flex-shrink-0">{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
