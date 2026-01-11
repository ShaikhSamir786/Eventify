"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { validateForm } from "@/lib/utils/validation";
import { useAuth } from "@/lib/context/AuthContext";
import { useToast } from "@/components/ui/Toast";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const toast = useToast();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validation = validateForm(formData, {
            email: { required: true, email: true },
            password: { required: true },
        });

        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        setLoading(true);

        try {
            const result = await login(formData.email, formData.password);

            if (result.success) {
                toast.success("Welcome back!");
                router.push("/dashboard");
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 gradient-bg-hero">
            <div className="w-full max-w-md animate-fade-in-up">
                <Card variant="glass" className="backdrop-blur-xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-white/80">Sign in to your Eventify account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            required
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                            }
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />

                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.password}
                            required
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            }
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />

                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <Link
                                    href="/forgot-password"
                                    className="text-white/80 hover:text-white hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            loading={loading}
                            className="w-full"
                        >
                            Sign In
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-white/80 text-sm">
                            Don't have an account?{" "}
                            <Link
                                href="/register"
                                className="text-white font-semibold hover:underline"
                            >
                                Create one
                            </Link>
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
