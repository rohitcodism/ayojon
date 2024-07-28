"use client"
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";



export const SearchBox = () => {
    return (
        <div className="container flex justify-center items-center pb-16" >
            <div
                className="relative max-w-[800px] w-full"
            >
                <Input
                    type="text"
                    placeholder="Search for an upcoming event"
                    className="
                    max-w-[800px]
                    bg-black
                    border-2
                    border-white
                    px-6
                    py-8
                    rounded-full
                    outline-none
                    text-white
                    text-base
                "
                    style={{ outline: 'none', boxShadow: 'none' }}
                />
                <Search className="absolute right-8 top-1/2 transform -translate-y-1/2 text-white"/>
            </div>
        </div>
    );
}