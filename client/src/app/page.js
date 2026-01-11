"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export default function Home() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "User Management",
      description: "Secure authentication with OTP verification and JWT tokens for session management.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Event Creation",
      description: "Create and manage events with ease. Invite participants via email automatically.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Collaboration",
      description: "Invite participants and collaborate on events with real-time updates.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Top Security",
      description: "Rate limiting, JWT authentication, and email-based OTP verification.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
        </svg>
      ),
      title: "Filter & Search",
      description: "Powerful filtering and pagination to find events quickly and efficiently.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Lightning Fast",
      description: "Built with modern technologies for optimal performance and scalability.",
    },
  ];

  const securityFeatures = [
    { label: "Rate Limiting", description: "GraphQL-level protection against DoS attacks" },
    { label: "JWT Tokens", description: "Secure session management" },
    { label: "OTP Verification", description: "Email-based two-factor authentication" },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center gradient-bg-hero">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="container-custom relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <Badge variant="info" className="mb-6 bg-white/20 text-white border-white/30">
              🚀 Modern Event Management Platform
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
              Simplify Your Event
              <br />
              <span className="gradient-text-accent">Management</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
              Create, manage, and collaborate on events with top-notch security and an intuitive interface.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="text-lg px-8 py-4 shadow-2xl hover:shadow-glow">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/#features">
                <Button variant="ghost" size="lg" className="text-lg px-8 py-4 bg-white/10 text-white hover:bg-white/20 border-white/30">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-surface">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in-up">
            <Badge variant="info" className="mb-4">Features</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Powerful features designed to make event management effortless
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                variant="elevated"
                hoverable
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-primary-600 dark:text-primary-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-secondary">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-24 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="success" className="mb-4">Security First</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Built with Security in Mind
              </h2>
              <p className="text-xl text-text-secondary">
                Your data is protected with industry-standard security measures
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {securityFeatures.map((feature, index) => (
                <Card
                  key={index}
                  variant="glass"
                  className="text-center backdrop-blur-xl"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full gradient-bg-primary flex items-center justify-center shadow-glow">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.label}
                  </h3>
                  <p className="text-sm text-text-secondary">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-bg-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Join thousands of users managing their events with Eventify
            </p>
            <Link href="/register">
              <Button size="lg" className="text-lg px-10 py-5 shadow-2xl hover:shadow-glow">
                Create Your Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
