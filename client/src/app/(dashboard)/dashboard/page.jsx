"use client";

import { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/context/AuthContext";
import { GET_MY_EVENTS, GET_INVITED_EVENTS } from "@/lib/graphql/queries";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Spinner from "@/components/ui/Spinner";
import { formatDate } from "@/lib/utils/formatters";

export default function DashboardPage() {
    const router = useRouter();
    const { user, isAuthenticated, loading: authLoading } = useAuth();

    const { data: myEventsData, loading: myEventsLoading } = useQuery(GET_MY_EVENTS);
    const { data: invitedEventsData, loading: invitedEventsLoading } = useQuery(GET_INVITED_EVENTS);

    useEffect(() => {
        if (!authLoading && !isAuthenticated()) {
            router.push("/login");
        }
    }, [authLoading, isAuthenticated, router]);

    if (authLoading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    const myEvents = myEventsData?.myEvents || [];
    const invitedEvents = invitedEventsData?.invitedEvents || [];
    const upcomingEvents = [...myEvents, ...invitedEvents].filter(
        (event) => new Date(event.date) > new Date()
    );

    return (
        <div className="min-h-screen bg-surface py-12">
            <div className="container-custom">
                {/* Welcome Section */}
                <div className="mb-12 animate-fade-in-up">
                    <h1 className="text-4xl font-bold text-foreground mb-2">
                        Welcome back, {user.firstName}! 👋
                    </h1>
                    <p className="text-text-secondary text-lg">
                        Here's what's happening with your events
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <Card variant="elevated" className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-text-secondary text-sm mb-1">Total Events</p>
                                <p className="text-3xl font-bold text-foreground">{myEvents.length}</p>
                            </div>
                            <div className="w-12 h-12 rounded-full gradient-bg-primary flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </Card>

                    <Card variant="elevated" className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-text-secondary text-sm mb-1">Upcoming</p>
                                <p className="text-3xl font-bold text-foreground">{upcomingEvents.length}</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-secondary-500 to-primary-500 flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </Card>

                    <Card variant="elevated" className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-text-secondary text-sm mb-1">Invitations</p>
                                <p className="text-3xl font-bold text-foreground">{invitedEvents.length}</p>
                            </div>
                            <div className="w-12 h-12 rounded-full gradient-bg-accent flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link href="/events/create">
                            <Card variant="outlined" hoverable clickable className="h-full">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg gradient-bg-primary flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">Create New Event</h3>
                                        <p className="text-sm text-text-secondary">Start planning your next event</p>
                                    </div>
                                </div>
                            </Card>
                        </Link>

                        <Link href="/events">
                            <Card variant="outlined" hoverable clickable className="h-full">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-secondary-500 to-primary-500 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">View All Events</h3>
                                        <p className="text-sm text-text-secondary">Manage your events and invitations</p>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    </div>
                </div>

                {/* Recent Events */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-foreground">Recent Events</h2>
                        <Link href="/events">
                            <Button variant="ghost" size="sm">
                                View All →
                            </Button>
                        </Link>
                    </div>

                    {myEventsLoading || invitedEventsLoading ? (
                        <div className="flex justify-center py-12">
                            <Spinner size="lg" />
                        </div>
                    ) : upcomingEvents.length === 0 ? (
                        <Card variant="outlined" className="text-center py-12">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                                <svg className="w-8 h-8 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">No upcoming events</h3>
                            <p className="text-text-secondary mb-6">Create your first event to get started</p>
                            <Link href="/events/create">
                                <Button variant="primary">Create Event</Button>
                            </Link>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {upcomingEvents.slice(0, 6).map((event, index) => (
                                <Link key={event.id} href={`/events/${event.id}`}>
                                    <Card variant="elevated" hoverable clickable className="h-full animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="font-semibold text-foreground text-lg">{event.title}</h3>
                                            <Badge variant="info" size="sm">
                                                {new Date(event.date) > new Date() ? "Upcoming" : "Past"}
                                            </Badge>
                                        </div>
                                        <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                                            {event.description || "No description"}
                                        </p>
                                        <div className="space-y-2 text-sm text-text-secondary">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                {formatDate(event.date, "short")}
                                            </div>
                                            {event.location && (
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    {event.location}
                                                </div>
                                            )}
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
