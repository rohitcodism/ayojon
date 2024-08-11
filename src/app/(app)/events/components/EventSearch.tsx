"use client"
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Event } from "@/models/event.model";
import axios from "axios";
import { Search } from "lucide-react";
import { useState } from "react";



export const SearchBox = () => {

    const[searchKeyword, setSearchKeyWord] = useState<string | null>(null)

    const[searchResult, setSearchResult] = useState<Event[] | null>();

    const {toast} = useToast();

    const getSearchResult = async(searchKeyword: string) => {
        const res = await axios.get("");

        if(res.status === 200){
            setSearchResult(res.data);
        }else{
            toast({
                title: "Oops!!",
                description: "Something went wrong.",
                variant: "destructive"
            })
        }
    }

    return (
        <div className="container flex flex-col justify-center items-center" >
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
                    onChange={(e) => setSearchKeyWord(e.target.value)}
                />
                <Search size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white" />
            </div>
            {
                    searchKeyword && (
                        <div
                            className="bg-gray-900 rounded-lg py-4 px-4 max-w-[450px] h-auto w-full text-center"
                        >
                            Nothing to show up
                        </div>
                    )
                }
        </div>
    );
}