'use client'
import Link from "next/link"
import { SearchBox } from "./EventSearch";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion'
import { CreateEvent } from "./createEvent";
import { UserAvatar } from "@/app/components/UserAvatar";
import { useSession } from "next-auth/react";



export const Navbar = () => {

    const { status } = useSession();

    return (
        <nav className="py-6 bg-white shadow-md dark:bg-black">
            <div className="flex container gap-8 items-center w-full dark:bg-black">
                <div className="text-2xl font-bold text-black dark:text-white">
                    <Link href="/">Ayojon</Link>
                </div>
                <SearchBox />
                <CreateEvent />
                {
                    status === 'authenticated' ? (<UserAvatar />)  : (<Link href={"/signup"}><Button className='rounded-lg'>Sign up</Button></Link>)
                }
            </div>
        </nav>
    );
}