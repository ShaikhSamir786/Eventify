"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN, LOGOUT } from "../graphql/mutations";

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const [loginMutation] = useMutation(LOGIN);
    const [logoutMutation] = useMutation(LOGOUT);

    // Check for existing token on mount
    useEffect(() => {
        const storedToken = localStorage.getItem("eventify_token");
        const storedUser = localStorage.getItem("eventify_user");

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await loginMutation({
                variables: {
                    input: { email, password },
                },
            });

            if (data.login.success) {
                const { token: newToken, user: newUser } = data.login;
                setToken(newToken);
                setUser(newUser);
                localStorage.setItem("eventify_token", newToken);
                localStorage.setItem("eventify_user", JSON.stringify(newUser));
                return { success: true, message: data.login.message };
            } else {
                return { success: false, message: data.login.message };
            }
        } catch (error) {
            return {
                success: false,
                message: error.message || "Login failed. Please try again.",
            };
        }
    };

    const logout = async () => {
        try {
            await logoutMutation();
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setToken(null);
            setUser(null);
            localStorage.removeItem("eventify_token");
            localStorage.removeItem("eventify_user");
        }
    };

    const isAuthenticated = () => {
        return !!token && !!user;
    };

    const value = {
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
