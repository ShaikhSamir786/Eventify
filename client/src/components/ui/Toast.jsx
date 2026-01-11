"use client";

import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within ToastProvider");
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback(
        ({ message, type = "info", duration = 5000, action }) => {
            const id = Date.now() + Math.random();
            const toast = { id, message, type, action };

            setToasts((prev) => [...prev, toast]);

            if (duration > 0) {
                setTimeout(() => {
                    setToasts((prev) => prev.filter((t) => t.id !== id));
                }, duration);
            }

            return id;
        },
        []
    );

    const dismissToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const value = {
        showToast,
        dismissToast,
        success: (message, options) =>
            showToast({ message, type: "success", ...options }),
        error: (message, options) =>
            showToast({ message, type: "error", ...options }),
        warning: (message, options) =>
            showToast({ message, type: "warning", ...options }),
        info: (message, options) =>
            showToast({ message, type: "info", ...options }),
    };

    return (
        <ToastContext.Provider value={value}>
            {children}
            <ToastContainer toasts={toasts} onDismiss={dismissToast} />
        </ToastContext.Provider>
    );
};

const ToastContainer = ({ toasts, onDismiss }) => {
    return (
        <div className="fixed top-4 right-4 z-[var(--z-toast)] flex flex-col gap-2 max-w-md">
            {toasts.map((toast) => (
                <Toast key={toast.id} {...toast} onDismiss={() => onDismiss(toast.id)} />
            ))}
        </div>
    );
};

const Toast = ({ id, message, type, action, onDismiss }) => {
    const icons = {
        success: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                />
            </svg>
        ),
        error: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                />
            </svg>
        ),
        warning: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                />
            </svg>
        ),
        info: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                />
            </svg>
        ),
    };

    const styles = {
        success: "bg-success-50 text-success-800 border-success-200 dark:bg-success-900 dark:text-success-100 dark:border-success-700",
        error: "bg-error-50 text-error-800 border-error-200 dark:bg-error-900 dark:text-error-100 dark:border-error-700",
        warning: "bg-warning-50 text-warning-800 border-warning-200 dark:bg-warning-900 dark:text-warning-100 dark:border-warning-700",
        info: "bg-primary-50 text-primary-800 border-primary-200 dark:bg-primary-900 dark:text-primary-100 dark:border-primary-700",
    };

    return (
        <div
            className={`flex items-start gap-3 p-4 rounded-lg border shadow-lg animate-slide-in-right ${styles[type]}`}
            role="alert"
        >
            <div className="flex-shrink-0">{icons[type]}</div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{message}</p>
                {action && (
                    <button
                        onClick={action.onClick}
                        className="mt-2 text-sm font-semibold underline hover:no-underline"
                    >
                        {action.label}
                    </button>
                )}
            </div>
            <button
                onClick={onDismiss}
                className="flex-shrink-0 p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-smooth"
                aria-label="Dismiss"
            >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </div>
    );
};

export default Toast;
