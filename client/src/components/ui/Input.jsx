"use client";

import { forwardRef, useState } from "react";

const Input = forwardRef(
    (
        {
            label,
            type = "text",
            error,
            helperText,
            icon,
            iconPosition = "left",
            maxLength,
            showCharCount = false,
            className = "",
            containerClassName = "",
            ...props
        },
        ref
    ) => {
        const [focused, setFocused] = useState(false);
        const [value, setValue] = useState(props.value || props.defaultValue || "");

        const handleChange = (e) => {
            setValue(e.target.value);
            if (props.onChange) {
                props.onChange(e);
            }
        };

        const baseInputStyles =
            "w-full px-4 py-2.5 bg-input-bg border rounded-lg text-foreground placeholder:text-text-tertiary transition-smooth focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed";

        const errorStyles = error
            ? "border-error-500 focus:ring-error-500"
            : "border-input-border hover:border-border-hover";

        const iconPaddingStyles = icon
            ? iconPosition === "left"
                ? "pl-11"
                : "pr-11"
            : "";

        return (
            <div className={`w-full ${containerClassName}`}>
                {label && (
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                        {label}
                        {props.required && <span className="text-error-500 ml-1">*</span>}
                    </label>
                )}

                <div className="relative">
                    {icon && (
                        <div
                            className={`absolute top-1/2 -translate-y-1/2 ${iconPosition === "left" ? "left-3" : "right-3"
                                } text-text-tertiary pointer-events-none`}
                        >
                            {icon}
                        </div>
                    )}

                    {type === "textarea" ? (
                        <textarea
                            ref={ref}
                            className={`${baseInputStyles} ${errorStyles} ${iconPaddingStyles} ${className} resize-none`}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            onChange={handleChange}
                            maxLength={maxLength}
                            rows={4}
                            {...props}
                        />
                    ) : (
                        <input
                            ref={ref}
                            type={type}
                            className={`${baseInputStyles} ${errorStyles} ${iconPaddingStyles} ${className}`}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            onChange={handleChange}
                            maxLength={maxLength}
                            {...props}
                        />
                    )}
                </div>

                {(error || helperText || (showCharCount && maxLength)) && (
                    <div className="mt-1.5 flex items-center justify-between gap-2">
                        <div className="flex-1">
                            {error && (
                                <p className="text-sm text-error-500 flex items-center gap-1">
                                    <svg
                                        className="w-4 h-4 flex-shrink-0"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {error}
                                </p>
                            )}
                            {!error && helperText && (
                                <p className="text-sm text-text-secondary">{helperText}</p>
                            )}
                        </div>

                        {showCharCount && maxLength && (
                            <p className="text-xs text-text-tertiary flex-shrink-0">
                                {value.length}/{maxLength}
                            </p>
                        )}
                    </div>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;
