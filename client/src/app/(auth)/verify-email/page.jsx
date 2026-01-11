"use client";

import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { VERIFY_EMAIL } from "@/lib/graphql/mutations";
import { useToast } from "@/components/ui/Toast";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function VerifyEmailPage() {
    const router = useRouter();
    const toast = useToast();
    const [verifyEmail, { loading }] = useMutation(VERIFY_EMAIL);

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [email, setEmail] = useState("");

    useEffect(() => {
        const storedEmail = sessionStorage.getItem("verification_email");
        if (!storedEmail) {
            toast.error("No email found. Please register first.");
            router.push("/register");
        } else {
            setEmail(storedEmail);
        }
    }, [router, toast]);

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const otpCode = otp.join("");
        if (otpCode.length !== 6) {
            toast.error("Please enter the complete 6-digit code");
            return;
        }

        try {
            const { data } = await verifyEmail({
                variables: {
                    input: {
                        email,
                        otp: otpCode,
                    },
                },
            });

            if (data.verifyEmail.success) {
                toast.success(data.verifyEmail.message);
                sessionStorage.removeItem("verification_email");
                router.push("/login");
            } else {
                toast.error(data.verifyEmail.message);
            }
        } catch (error) {
            toast.error(error.message || "Verification failed. Please try again.");
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
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Verify Your Email
                        </h1>
                        <p className="text-white/80">
                            We've sent a 6-digit code to <br />
                            <span className="font-semibold">{email}</span>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex justify-center gap-2">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-${index}`}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-12 h-14 text-center text-2xl font-bold bg-white/10 border-2 border-white/20 rounded-lg text-white focus:border-white focus:outline-none transition-smooth"
                                />
                            ))}
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            loading={loading}
                            className="w-full"
                        >
                            Verify Email
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-white/80 text-sm">
                            Didn't receive the code?{" "}
                            <button className="text-white font-semibold hover:underline">
                                Resend
                            </button>
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
