import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthWrapper from "@/components/AuthWrapper";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({subsets:['latin']})

export const metadata: Metadata = {
  title: "Booking App",
  description: "Book a room",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthWrapper>
    <html lang="en">
      <body
        className={`${inter.className} bg-white dark:bg-slate-800`}
      >
        <Header/>
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
        </main>
        <Footer/>
        <ToastContainer theme="colored" />
      </body>
    </html>
    </AuthWrapper>
  );
}
