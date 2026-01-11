// Email validation
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Password strength checker
export const checkPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "None", color: "neutral" };

    let strength = 0;
    const checks = {
        length: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password),
    };

    strength = Object.values(checks).filter(Boolean).length;

    const labels = {
        0: { label: "Very Weak", color: "error" },
        1: { label: "Weak", color: "error" },
        2: { label: "Fair", color: "warning" },
        3: { label: "Good", color: "warning" },
        4: { label: "Strong", color: "success" },
        5: { label: "Very Strong", color: "success" },
    };

    return { strength, ...labels[strength], checks };
};

// Required field validation
export const isRequired = (value) => {
    if (typeof value === "string") {
        return value.trim().length > 0;
    }
    return value !== null && value !== undefined;
};

// Date validation
export const isValidDate = (date) => {
    const dateObj = new Date(date);
    return dateObj instanceof Date && !isNaN(dateObj);
};

export const isFutureDate = (date) => {
    const dateObj = new Date(date);
    const now = new Date();
    return dateObj > now;
};

// Form validation helper
export const validateForm = (fields, rules) => {
    const errors = {};

    Object.keys(rules).forEach((fieldName) => {
        const value = fields[fieldName];
        const fieldRules = rules[fieldName];

        if (fieldRules.required && !isRequired(value)) {
            errors[fieldName] = fieldRules.requiredMessage || "This field is required";
            return;
        }

        if (fieldRules.email && value && !isValidEmail(value)) {
            errors[fieldName] = "Please enter a valid email address";
            return;
        }

        if (fieldRules.minLength && value && value.length < fieldRules.minLength) {
            errors[fieldName] = `Must be at least ${fieldRules.minLength} characters`;
            return;
        }

        if (fieldRules.maxLength && value && value.length > fieldRules.maxLength) {
            errors[fieldName] = `Must be no more than ${fieldRules.maxLength} characters`;
            return;
        }

        if (fieldRules.match && value !== fields[fieldRules.match]) {
            errors[fieldName] = fieldRules.matchMessage || "Fields do not match";
            return;
        }

        if (fieldRules.custom && !fieldRules.custom(value, fields)) {
            errors[fieldName] = fieldRules.customMessage || "Invalid value";
            return;
        }
    });

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};
