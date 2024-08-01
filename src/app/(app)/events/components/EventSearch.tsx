"use client"
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

/*
    TODO: Yet to Implement search API
*/



export const SearchBox = () => {
    return (
        <div className="container flex justify-center items-center" >
            <div
                className="relative max-w-[500px] w-full"
            >
                <Input
                    type="text"
                    placeholder="Search for an upcoming event"
                    className="
                    max-w-[500px]
                    bg-black
                    border-[1px]
                    border-white
                    px-4
                    py-4
                    rounded-full
                    outline-none
                    text-white
                    text-sm
                "
                    style={{ outline: 'none', boxShadow: 'none' }}
                />
                <Search size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white" />
            </div>
        </div>
    );
}