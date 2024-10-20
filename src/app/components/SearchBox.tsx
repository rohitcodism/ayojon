"use client"
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

/*
    TODO: Yet to Implement search API
*/



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
                    bg-white
                    dark:bg-black
                    border-2
                    border-black
                    text-gray-500
                    dark:border-white
                    dark:text-white
                    px-6
                    py-8
                    rounded-full
                    outline-none
                    text-xl
                "
                    style={{ outline: 'none', boxShadow: 'none' }}
                />
                <Search className="absolute right-8 top-1/2 transform -translate-y-1/2 dark:text-white text-black"/>
            </div>
        </div>
    );
}