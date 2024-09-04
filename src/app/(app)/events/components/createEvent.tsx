'use client'
import { motion } from 'framer-motion'
import Link from 'next/link';

export const CreateEvent = () => {
    return (
        <Link
            href={"/create"}
        >
            <motion.button
                whileHover={{
                    backgroundPosition: '0% 0%',
                    color: 'black', // Set to black to contrast against the white background during hover
                    transition: {
                        duration: 0.5,
                        ease: 'easeInOut'
                    }
                }}
                style={{
                    background: 'linear-gradient(to right, white, white 50%, black 50%)',
                    backgroundSize: '200% 100%',
                    backgroundPosition: '100% 0%',
                    cursor: 'pointer',
                    borderRadius: '9999px',
                    textAlign: 'center',
                    display: 'inline-block'
                }}
                className="text-white font-semibold shadow-md text-nowrap px-4 py-2 border-2 border-solid border-black dark:border-white"
            >
                Create Event
            </motion.button>
        </Link>
    );
}