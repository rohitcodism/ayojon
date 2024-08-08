
import { FeaturedEventCard } from "@/app/components/FeaturedEventCard"
import { featuredEvents } from "../../../../../constants"
import { Categories } from "./Categories"
import { useGlobalContext } from "../../../../../context/GlobalContext"



export const EventPage = () => {

    const { selectedEventCategory } = useGlobalContext();

    let listedEvents;

    if(selectedEventCategory){
        listedEvents = featuredEvents.filter((event) => event.category === selectedEventCategory);
    }else{
        listedEvents = featuredEvents;
    }

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
                </div>
                <Categories />
            </div>
            <div
                className="container flex items-center gap-16"
            >
                {listedEvents.length ? (listedEvents.map((event, index) => (
                    <div
                        key={index}
                    >
                        <FeaturedEventCard title={event!.name} image={event!.image} date={event!.date} />
                    </div>
                ))) : (<div className="flex justify-center items-center text-lg font-medium w-full h-[200px] text-gray-500">
                    <p>No upcoming events for this category</p>
                </div>)}
            </div>
        </div>
    );
}