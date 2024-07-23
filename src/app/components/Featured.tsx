import { featuredEvents } from "../../../constants";
import { FeaturedEventCard } from "./FeaturedEventCard";



export const Featured = () => {
    return(
        <div
            className="
                container
            "
        >
            <div
                
            >
                <h1
                    className="text-4xl font-bold"
                >
                    Featured Events
                </h1>
            </div>
            <div
                className="
                    flex
                    gap-16
                    items-center
                    pt-8
                "
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