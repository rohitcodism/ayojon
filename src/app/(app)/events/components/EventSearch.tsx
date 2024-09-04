"use client"
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Event } from "@/models/event.model";
import axios from "axios";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounceCallback, useDebounceValue } from "usehooks-ts";

interface searchedEvent {
    title: string,
    date: Date
}



export const SearchBox = () => {

    const [searchKeyword, setSearchKeyWord] = useState<string | null>(null);

    const [debouncedSearchKeyword, setDebouncedSearchKeyword] = useDebounceValue(searchKeyword, 500);

    const [searchResult, setSearchResult] = useState<searchedEvent[] | null>();

    const { toast } = useToast();

    const getSearchResult = async (searchKeyword: string) => {
        const res = await axios.get(`/api/event/find/?query=${searchKeyword}`);

        if (res.status === 200) {
            setSearchResult(res.data.data);
            console.log(searchResult);
        } else {
            toast({
                title: "Oops!!",
                description: "Something went wrong.",
                variant: "destructive"
            })
        }
    }

    useEffect(() => {
        if (debouncedSearchKeyword) {
            getSearchResult(debouncedSearchKeyword);
        }
    }, [debouncedSearchKeyword]);

    return (
        <div className="container flex flex-col justify-center items-center max-h-[700px]">
            <div className="relative max-w-[500px] w-full">
                <Input
                    type="text"
                    placeholder="Search for an upcoming event"
                    className="
                        w-full
                        bg-black
                        border-[1px]
                        border-white
                        px-4
                        py-2
                        rounded-full
                        outline-none
                        text-white
                        text-sm
                    "
                    style={{ outline: 'none', boxShadow: 'none' }}
                    onChange={(e) => setSearchKeyWord(e.target.value)}
                />
                <Search size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white" />

                {searchKeyword && (
                    <div
                        className="
                            absolute
                            left-0
                            right-0
                            bg-gray-900 
                            rounded-lg 
                            py-4 
                            px-4 
                            text-center 
                            mt-2 
                            shadow-lg
                            z-20
                            max-h-[300px]
                            overflow-y-auto
                        "
                        style={{ top: '100%' }} // Positioning it directly below the input
                    >
                        {searchResult && searchResult.length > 0 ? (
                            searchResult.map((event, index) => (
                                <div
                                    key={index}
                                    className="
                                        text-sm
                                        font-medium
                                        text-white
                                        text-start
                                        p-2
                                        border-b
                                        border-gray-700
                                        last:border-0
                                        cursor-pointer
                                        hover:text-blue-600
                                    "
                                >
                                    {event.title}
                                </div>
                            ))
                        ) : (
                            <div className="text-sm text-white">Nothing to show up</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}