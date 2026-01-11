"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FORGOT_PASSWORD } from "@/lib/graphql/mutations";
import { validateForm } from "@/lib/utils/validation";
import { useToast } from "@/components/ui/Toast";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const toast = useToast();
    const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD);

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validation = validateForm({ email }, {
            email: { required: true, email: true },
        });

        if (!validation.isValid) {
            setError(validation.errors.email);
            return;
        }

        try {
            const { data } = await forgotPassword({
                variables: { input: { email } },
            });

            if (data.forgotPassword.success) {
                toast.success(data.forgotPassword.message);
                sessionStorage.setItem("reset_email", email);
                router.push("/reset-password");
            } else {
                toast.error(data.forgotPassword.message);
            }
        } catch (error) {
            toast.error(error.message || "Failed to send reset code.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 gradient-bg-hero">
            <div className="w-full max-w-md animate-fade-in-up">
                <Card variant="glass" className="backdrop-blur-xl">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                                />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Forgot Password?
                        </h1>
                        <p className="text-white/80">
                            Enter your email and we'll send you a code to reset your password
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError("");
                            }}
                            error={error}
                            required
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                            }
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            loading={loading}
                            className="w-full"
                        >
                            Send Reset Code
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link
                            href="/login"
                            className="text-white/80 text-sm hover:text-white hover:underline"
                        >
                            ← Back to login
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    );
}
