'use client'
import Link from "next/link"
import { SearchBox } from "./EventSearch";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion'
import { CreateEvent } from "./createEvent";



export const Navbar = () => {
    return (
        <nav className="py-6 bg-white shadow-md dark:bg-black">
            <div className="flex container gap-8 items-center w-full dark:bg-black">
                <div className="text-2xl font-bold text-black dark:text-white">
                    <Link href="/">Ayojon</Link>
                </div>
                <SearchBox />
                <CreateEvent />
            </div>
        </nav>
    );
}