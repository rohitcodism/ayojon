import { eventTypes } from "../../../constants";
import { EventCard } from "./EventCard";



const Events = () => {
    return (
        <div
            className="
                container
                flex
                flex-col
                gap-4
                py-4
            "
        >
            <div
                className="flex flex-col gap-2 pb-2"
            >
                <h1
                    className="text-4xl font-bold"
                >
                    Discover the best events
                </h1>
                <p
                    className="text-md font-semibold"
                >
                    We offer a wide range of events, from music festivals and tech conferences and stand up comedy shows
                </p>
            </div>
            <div
                className="
                    flex
                    items-center
                    gap-16
                    pt-8
                "
            >
                {
                    eventTypes.map((eventType) => {
                        return(
                            <EventCard title={eventType.title} image={eventType.image} />
                        );
                    })
                }
            </div>
            {
                /*
                    <div>
                        Fetch featured events from DB
                    </div>
                 */
            }
        </div>
    );
}

export default Events;