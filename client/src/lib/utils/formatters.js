// Date formatting utilities
export const formatDate = (date, format = "full") => {
    const dateObj = new Date(date);

    if (isNaN(dateObj)) return "Invalid date";

    const options = {
        full: {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        },
        short: {
            year: "numeric",
            month: "short",
            day: "numeric",
        },
        time: {
            hour: "2-digit",
            minute: "2-digit",
        },
    };

    return new Intl.DateTimeFormat("en-US", options[format] || options.full).format(
        dateObj
    );
};

// Relative time formatting (e.g., "2 hours ago", "in 3 days")
export const formatRelativeTime = (date) => {
    const dateObj = new Date(date);
    const now = new Date();
    const diffInSeconds = Math.floor((now - dateObj) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
    };

    for (const [unit, seconds] of Object.entries(intervals)) {
        const interval = Math.floor(Math.abs(diffInSeconds) / seconds);

        if (interval >= 1) {
            const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
            return rtf.format(diffInSeconds < 0 ? interval : -interval, unit);
        }
    }

    return "just now";
};

// Name formatting
export const formatFullName = (firstName, lastName) => {
    const first = firstName?.trim() || "";
    const last = lastName?.trim() || "";
    return `${first} ${last}`.trim() || "Unknown User";
};

export const getInitials = (firstName, lastName) => {
    const first = firstName?.charAt(0)?.toUpperCase() || "";
    const last = lastName?.charAt(0)?.toUpperCase() || "";
    return `${first}${last}` || "?";
};

// Email masking for privacy
export const maskEmail = (email) => {
    if (!email || !email.includes("@")) return email;

    const [username, domain] = email.split("@");
    const visibleChars = Math.min(3, Math.floor(username.length / 2));
    const masked = username.substring(0, visibleChars) + "***";

    return `${masked}@${domain}`;
};

// Number formatting
export const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US").format(num);
};

// Truncate text
export const truncate = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
};
