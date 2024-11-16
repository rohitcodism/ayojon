"use client"

import Link from 'next/link';
import { useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
import { Button } from './button';
import { motion, AnimatePresence } from "framer-motion"
import { ModeToggle } from './darkMode';
import { useSession } from 'next-auth/react';
import { signOut, signIn } from 'next-auth/react';
import { UserAvatar } from '@/app/components/UserAvatar';

const Navbar = () => {

    const {data: session, status} = useSession();

    console.log(session?.user);

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
            <nav className="py-2 bg-white shadow-md dark:bg-black max-h-[200px]">
                <div className=" container  flex justify-between items-center">
                    <div className="text-xl font-bold text-black dark:text-white">
                        <Link href="/">Ayojon</Link>
                    </div>
                    <div className="pl-16 hidden md:flex space-x-12 md:items-center text-md font-medium">
                        <Link href="/" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">Home</Link>
                        <Link href="/about" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">About</Link>
                        <Link href="/events" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">Events</Link>
                        <Link href="/contact" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">Contact</Link>
                    </div>
                    <div className='flex space-x-8 items-center'>
                        <div>
                            <ModeToggle />
                        </div>
                        {
                            status === 'authenticated' ? (<UserAvatar />)  : (<Link href={"/signup"}><Button className='rounded-lg'>Sign up</Button></Link>)
                        }
                    </div>
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
                            {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden"
                        >
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-200">
                                    Home
                                </Link>
                                <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-200">
                                    About
                                </Link>
                                <Link href="/events" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-200">
                                    Events
                                </Link>
                                <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-200">
                                    Contact
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        )
};

export default Navbar;
