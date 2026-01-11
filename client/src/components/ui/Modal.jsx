"use client";

import { useEffect, useRef } from "react";

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = "md",
    closeOnBackdrop = true,
    closeOnEsc = true,
    showCloseButton = true,
}) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleEsc = (e) => {
            if (closeOnEsc && e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
            document.body.style.overflow = "hidden";

            // Focus trap
            const focusableElements = modalRef.current?.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusableElements && focusableElements.length > 0) {
                focusableElements[0].focus();
            }
        }

        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, closeOnEsc, onClose]);

    if (!isOpen) return null;

    const sizes = {
        sm: "max-w-md",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        full: "max-w-full mx-4",
    };

    const handleBackdropClick = (e) => {
        if (closeOnBackdrop && e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-[var(--z-modal-backdrop)] flex items-center justify-center p-4 animate-fade-in"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal */}
            <div
                ref={modalRef}
                className={`relative bg-surface-elevated rounded-2xl shadow-2xl w-full ${sizes[size]} animate-scale-in overflow-hidden`}
            >
                {/* Header */}
                {(title || showCloseButton) && (
                    <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                        {title && (
                            <h2
                                id="modal-title"
                                className="text-xl font-semibold text-foreground"
                            >
                                {title}
                            </h2>
                        )}
                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="ml-auto p-2 rounded-lg text-text-secondary hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-smooth focus-ring"
                                aria-label="Close modal"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>
                )}

                {/* Body */}
                <div className="px-6 py-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="px-6 py-4 border-t border-border bg-neutral-50 dark:bg-neutral-900">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
