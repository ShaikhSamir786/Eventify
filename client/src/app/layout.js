import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "../lib/apollo-wrapper";
import { AuthProvider } from "../lib/context/AuthContext";
import { ToastProvider } from "../components/ui/Toast";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Eventify - Modern Event Management Platform",
  description:
    "Simplify how you create, manage, and collaborate on events with top-notch security and scalability.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApolloWrapper>
          <AuthProvider>
            <ToastProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </ToastProvider>
          </AuthProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
