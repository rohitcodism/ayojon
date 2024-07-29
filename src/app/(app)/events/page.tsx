import { Button } from "@/components/ui/button";
import { Categories } from "./components/Categories";
import { featuredEvents } from "../../../../constants";
import { FeaturedEventCard } from "@/app/components/FeaturedEventCard";



export default function EventPage() {
    return (
        <div
            className="
                dark:bg-black 
                bg-white
                w-full
                min-h-screen
            "
        >
            <div className="container py-8 flex flex-col gap-6">
                <div
                    className="flex justify-between items-center"
                >
                    <h1
                        className="
                    text-3xl
                    font-bold
                "
                    >
                        Events
                    </h1>
                    <Button
                        variant="outline"
                        className="dark:bg-white bg-black rounded-full dark:text-black py-4 px-4 text-lg font-semibold shadow-md text-white border-2 border-black dark:border-white hover:bg-gray-200 dark:hover:bg-transparent dark:hover:text-white hover:text-black"
                    >
                        Create
                    </Button>
                </div>
                <Categories />
            </div>
            <div
                className="container flex items-center gap-16"
            >
                {featuredEvents.map((event, index) => (
                    <div
                        key={index}
                    >
                        <FeaturedEventCard title={event.name} image={event.image} date={event.date} />
                    </div>
                ))}
            </div>
        </div>
    );
}