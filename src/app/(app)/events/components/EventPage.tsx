
import { FeaturedEventCard } from "@/app/components/FeaturedEventCard"
import { FeaturedEvent, featuredEvents } from "../../../../../constants"
import { Categories } from "./Categories"
import { useGlobalContext } from "../../../../../context/GlobalContext"
import { FeaturedCarousel } from "./FeaturedCarousel"

//TODO: Fix the categorization!!

export const EventPage = () => {

    const { selectedEventCategory, ddmCategory } = useGlobalContext();

    let listedEvents: FeaturedEvent[] | null = null;

    if (selectedEventCategory) {
        if (selectedEventCategory == "All") {
            listedEvents = featuredEvents;
        } else {
            listedEvents = featuredEvents.filter((event) => event.category === selectedEventCategory);
        }
    } else if (ddmCategory) {
        listedEvents = featuredEvents.filter((event) => event.category === ddmCategory);
    } else if (!selectedEventCategory || !ddmCategory) {
        listedEvents = featuredEvents;
    }

    return (
        <div
            className="
        dark:bg-black 
        bg-white
        w-full
        min-h-screen
        pb-8
    "
        >
            <div className="container py-8 flex flex-col gap-6">
                <div>
                    <div
                        className="flex flex-col gap-4 py-2"
                    >
                        <h1
                            className="text-4xl font-extrabold"
                        >
                            Featured
                        </h1>
                        <FeaturedCarousel />
                    </div>
                </div>
                <Categories />
            </div>
            <div
                className="container flex items-center gap-16"
            >
                {listedEvents?.length != 0 ? (listedEvents?.map((event, index) => (
                    <div
                        key={index}
                    >
                        <FeaturedEventCard title={event.name} image={event.image} date={event.date} />
                    </div>
                ))) : (<div className="flex justify-center items-center text-lg font-medium w-full h-[200px] text-gray-500">
                    <p>No upcoming events for this category</p>
                </div>)}
            </div>
        </div>
    );
}