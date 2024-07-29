import Link from "next/link"
import { SearchBox } from "./EventSearch";
import { Button } from "@/components/ui/button";



export const Navbar = () => {
    return (
        <nav className="py-6 bg-white shadow-md dark:bg-black">
            <div className="flex container gap-8 items-center w-full dark:bg-black">
                <div className="text-2xl font-bold text-black dark:text-white">
                    <Link href="/">Ayojon</Link>
                </div>
                <SearchBox />
                <Button
                    variant="outline"
                    className="dark:bg-white bg-black rounded-full dark:text-black py-4 px-4 text-lg font-semibold shadow-md text-white border-2 border-black dark:border-white hover:bg-gray-200 dark:hover:bg-transparent dark:hover:text-white hover:text-black"
                >
                    Create Event
                </Button>
            </div>
        </nav>
    );
}