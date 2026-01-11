"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import Button from "../ui/Button";

const Header = () => {
    const pathname = usePathname();
    const { user, isAuthenticated, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const navigation = [
        { name: "Home", href: "/" },
        { name: "Features", href: "/#features" },
        { name: "About", href: "/#about" },
    ];

    const dashboardNav = [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Events", href: "/events" },
        { name: "Profile", href: "/profile" },
    ];

    const handleLogout = async () => {
        await logout();
        window.location.href = "/";
    };

    return (
        <header className="sticky top-0 z-[var(--z-sticky)] glass border-b border-white/10">
            <nav className="container-custom">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg gradient-bg-primary flex items-center justify-center shadow-lg group-hover:shadow-glow transition-smooth">
                            <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <span className="text-xl font-bold gradient-text">Eventify</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {isAuthenticated() ? (
                            <>
                                {dashboardNav.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`text-sm font-medium transition-smooth hover:text-primary-500 ${pathname === item.href
                                                ? "text-primary-600 dark:text-primary-400"
                                                : "text-text-secondary"
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </>
                        ) : (
                            <>
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="text-sm font-medium text-text-secondary hover:text-primary-500 transition-smooth"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </>
                        )}
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        {isAuthenticated() ? (
                            <div className="relative">
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-smooth"
                                >
                                    <div className="w-8 h-8 rounded-full gradient-bg-accent flex items-center justify-center text-white font-semibold text-sm">
                                        {user?.firstName?.[0]}{user?.lastName?.[0]}
                                    </div>
                                    <span className="text-sm font-medium text-foreground">
                                        {user?.firstName}
                                    </span>
                                    <svg
                                        className="w-4 h-4 text-text-secondary"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                {userMenuOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setUserMenuOpen(false)}
                                        />
                                        <div className="absolute right-0 mt-2 w-48 bg-surface-elevated rounded-lg shadow-xl border border-border z-20 animate-scale-in">
                                            <Link
                                                href="/profile"
                                                className="block px-4 py-2 text-sm text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-t-lg transition-smooth"
                                                onClick={() => setUserMenuOpen(false)}
                                            >
                                                Profile Settings
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-sm text-error-600 hover:bg-error-50 dark:hover:bg-error-900/20 rounded-b-lg transition-smooth"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost" size="sm">
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button variant="primary" size="sm">
                                        Get Started
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-smooth"
                    >
                        <svg
                            className="w-6 h-6 text-foreground"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {mobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border animate-fade-in-down">
                        <div className="flex flex-col gap-2">
                            {(isAuthenticated() ? dashboardNav : navigation).map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${pathname === item.href
                                            ? "bg-primary-50 dark:bg-primary-950 text-primary-600 dark:text-primary-400"
                                            : "text-text-secondary hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                        }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            <div className="border-t border-border my-2" />

                            {isAuthenticated() ? (
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 rounded-lg text-sm font-medium text-error-600 hover:bg-error-50 dark:hover:bg-error-900/20 transition-smooth text-left"
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                        <Button variant="ghost" size="sm" className="w-full">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                                        <Button variant="primary" size="sm" className="w-full">
                                            Get Started
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
