"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CREATE_USER } from "@/lib/graphql/mutations";
import { validateForm, checkPasswordStrength } from "@/lib/utils/validation";
import { useToast } from "@/components/ui/Toast";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function RegisterPage() {
    const router = useRouter();
    const toast = useToast();
    const [createUser, { loading }] = useMutation(CREATE_USER);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [passwordStrength, setPasswordStrength] = useState({
        strength: 0,
        label: "None",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear error for this field
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }

        // Update password strength
        if (name === "password") {
            setPasswordStrength(checkPasswordStrength(value));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        const validation = validateForm(formData, {
            firstName: { required: true },
            lastName: { required: true },
            email: { required: true, email: true },
            password: { required: true, minLength: 8 },
            confirmPassword: {
                required: true,
                match: "password",
                matchMessage: "Passwords do not match",
            },
        });

        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        try {
            const { data } = await createUser({
                variables: {
                    input: {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        password: formData.password,
                    },
                },
            });

            if (data.createUser.success) {
                toast.success(data.createUser.message);
                // Store email for verification page
                sessionStorage.setItem("verification_email", formData.email);
                router.push("/verify-email");
            } else {
                toast.error(data.createUser.message);
            }
        } catch (error) {
            toast.error(error.message || "Registration failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 gradient-bg-hero">
            <div className="w-full max-w-md animate-fade-in-up">
                <Card variant="glass" className="backdrop-blur-xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Create Account
                        </h1>
                        <p className="text-white/80">Join Eventify and start managing events</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                error={errors.firstName}
                                required
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            />
                            <Input
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                error={errors.lastName}
                                required
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            />
                        </div>

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

                        {formData.password && (
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
                            Create Account
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-white/80 text-sm">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="text-white font-semibold hover:underline"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
