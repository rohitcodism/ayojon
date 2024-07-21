import React from "react";
import { Spotlight } from "../../components/ui/Spotlight";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroLight() {
    return (
        <div className="h-[33rem] w-full rounded-md flex md:items-center md:justify-center bg-white/[0.96] antialiased bg-grid-black/[0.02] relative overflow-hidden dark:bg-black/[0.96] dark:bg-grid-white/[0.02]">
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
            />
            <div className="p-4 max-w-7xl mx-auto relative z-10 text-center">
                <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b dark:from-white dark:to-gray-300 from-black to-gray-600 py-2">
                    Welcome to Ayojon
                </h1>

                <p className="mt-4 font-medium text-lg md:text-2xl dark:text-gray-200 max-w-2xl mx-auto text-gray-900">
                    Your Ultimate Event Management Solution
                </p>
                <div className="mt-8 flex justify-center gap-6">
                    <Link href={"/signup"}>
                        <div className="transition transform hover:scale-105 active:scale-95">
                            <Button className="dark:bg-white dark:text-black py-3 px-6 rounded-lg text-lg font-semibold shadow-md bg-black text-white">
                                Get Started
                            </Button>
                        </div>
                    </Link>
                    <Link href={"/about"}>
                        <div className="transition transform hover:scale-105 active:scale-95">
                            <Button
                                variant={"outline"}
                                className="bg-transparent rounded-full dark:text-white py-4 px-6 text-lg font-semibold shadow-md text-black border-2 border-black hover:bg-gray-200 dark:border-white dark:hover:bg-gray-100/25"
                            >
                                Create Event
                            </Button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
