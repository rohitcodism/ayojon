import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "../../components/ui/Spotlight";
import { Button } from "@/components/ui/button";

export function HeroLight() {

    return (
        <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
            />
            <div className="p-4 max-w-7xl mx-auto relative z-10 text-center">
                <h1 className="text-5xl md:text-7xl font-extrabold text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300">
                    Welcome to Ayojon
                </h1>
                <p className="mt-4 font-medium text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto">
                    Your Ultimate Event Management Solution
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <Button className="bg-white text-black py-3 px-6 rounded-lg text-lg font-semibold shadow-md">
                        Get Started
                    </Button>
                    <Button className="bg-transparent border border-white text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-md">
                        Learn More
                    </Button>
                </div>
            </div>
        </div>
    );
}
