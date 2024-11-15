'use client'
import { SessionProvider } from "next-auth/react";
import { Navbar } from "./components/Navbar";



export default function EventLayout(
    {
        children
    }: {
        children: React.ReactNode
    }
) {
    return (
        <SessionProvider>
            <div>
                {children}
            </div>
        </SessionProvider>
    );
}