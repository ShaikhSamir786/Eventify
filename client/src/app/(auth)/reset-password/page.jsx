"use client";

import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { RESET_PASSWORD } from "@/lib/graphql/mutations";
import { validateForm, checkPasswordStrength } from "@/lib/utils/validation";
import { useToast } from "@/components/ui/Toast";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function ResetPasswordPage() {
    const router = useRouter();
    const toast = useToast();
    const [resetPassword, { loading }] = useMutation(RESET_PASSWORD);

    const [formData, setFormData] = useState({
        otp: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    const [passwordStrength, setPasswordStrength] = useState({ strength: 0, label: "None" });

    useEffect(() => {
        const storedEmail = sessionStorage.getItem("reset_email");
        if (!storedEmail) {
            toast.error("No email found. Please request password reset first.");
            router.push("/forgot-password");
        } else {
            setEmail(storedEmail);
        }
    }, [router, toast]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }

        if (name === "newPassword") {
            setPasswordStrength(checkPasswordStrength(value));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validation = validateForm(formData, {
            otp: { required: true, minLength: 6, maxLength: 6 },
            newPassword: { required: true, minLength: 8 },
            confirmPassword: {
                required: true,
                match: "newPassword",
                matchMessage: "Passwords do not match",
            },
        });

        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        try {
            const { data } = await resetPassword({
                variables: {
                    input: {
                        email,
                        otp: formData.otp,
                        newPassword: formData.newPassword,
                    },
                },
            });

            if (data.resetPassword.success) {
                toast.success(data.resetPassword.message);
                sessionStorage.removeItem("reset_email");
                router.push("/login");
            } else {
                toast.error(data.resetPassword.message);
            }
        } catch (error) {
            toast.error(error.message || "Password reset failed.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 gradient-bg-hero">
            <div className="w-full max-w-md animate-fade-in-up">
                <Card variant="glass" className="backdrop-blur-xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Reset Password
                        </h1>
                        <p className="text-white/80">
                            Enter the code sent to your email and create a new password
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Verification Code"
                            type="text"
                            name="otp"
                            value={formData.otp}
                            onChange={handleChange}
                            error={errors.otp}
                            required
                            maxLength={6}
                            placeholder="Enter 6-digit code"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />

                        <Input
                            label="New Password"
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            error={errors.newPassword}
                            required
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            }
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />

                        {formData.newPassword && (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-white/80">Password Strength:</span>
                                    <span className={`font-medium ${passwordStrength.color === 'success' ? 'text-success-300' :
                                        passwordStrength.color === 'warning' ? 'text-warning-300' :
                                            'text-error-300'
                                        }`}>
                                        {passwordStrength.label}
                                    </span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all ${passwordStrength.color === 'success' ? 'bg-success-500' :
                                            passwordStrength.color === 'warning' ? 'bg-warning-500' :
                                                'bg-error-500'
                                            }`}
                                        style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        <Input
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={errors.confirmPassword}
                            required
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            loading={loading}
                            className="w-full"
                        >
                            Reset Password
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
}
