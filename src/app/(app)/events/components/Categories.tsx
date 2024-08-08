'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { eventCategories } from "../../../../../constants";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useGlobalContext } from "../../../../../context/GlobalContext";



export const Categories = () => {

    const { selectedEventCategory, setSelectedEventCategory, ddmCategory, setDdmCategory } = useGlobalContext();

    console.log(ddmCategory);

    return (
        <div className="flex items-center gap-16 max-w-[300px]">
            {eventCategories.slice(0, 5).map((category) => (
                <div
                    className={`
                    px-4 py-2 flex justify-center items-center gap-2 rounded-full cursor-pointer text-sm
                    border border-1 
                    ${selectedEventCategory === category ? 'bg-indigo-600 text-black dark:hover:bg-indigo-600 dark:border-indigo-600 dark:hover:border-indigo-600 dark:bg-indigo-600' : 'bg-transparent text-black dark:text-gray-400 border-black dark:border-white/40 dark:hover:border-white dark:hover:text-white'} hover:text-black
                `}
                    onClick={() => { setSelectedEventCategory(category); setDdmCategory(null) }}
                >
                    <p
                        className="
                        "
                    >
                        {category}
                    </p>
                    {selectedEventCategory === category ? <Check size={15} /> : null}
                </div>
            ))}
            {
                ddmCategory && (
                    <div
                        className={`
                    px-4 py-2 flex justify-center items-center gap-2 rounded-full cursor-pointer text-sm
                    border border-1 
                    ${ddmCategory === ddmCategory ? 'bg-indigo-600 text-black dark:hover:bg-indigo-600 dark:border-indigo-600 dark:hover:border-indigo-600 dark:bg-indigo-600' : 'bg-transparent text-black dark:text-gray-400 border-black dark:border-white/40 dark:hover:border-white dark:hover:text-white'} hover:text-black
                `}
                        onClick={() => {setSelectedEventCategory(null) }}
                    >
                        <p
                            className="
                        "
                        >
                            {ddmCategory}
                        </p>
                        {ddmCategory === ddmCategory ? <Check size={15} /> : null}
                    </div>
                )
            }
            <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                    <div
                        className="bg-transparent px-4 py-2 flex items-center rounded-full cursor-pointer text-sm text-black dark:text-white dark:hover:text-white hover:text-black border border-1 dark:border-white/40 dark:hover:border-white/100 border-black hover:border-black  gap-2"
                    >
                        <p>
                            More
                        </p>
                        <ChevronDown />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white dark:bg-black border-[0.5px] dark:border-white border-black">
                    {eventCategories.slice(6, 11).map((category) => (
                        <DropdownMenuItem onClick={() => {setDdmCategory(category); setSelectedEventCategory(null)}} className="dark:focus:bg-white/30 cursor-pointer hover:text-black focus:bg-black/30">
                            {category}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}