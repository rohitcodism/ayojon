// src/pages/create-event/steps/Review.tsx
import React from "react";
import { useFormContext } from "react-hook-form";
import {
    MapPin,
    CalendarCheck,
    Users,
} from "lucide-react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

const Review = () => {
    const { getValues } = useFormContext();
    const data = getValues();

    //TODO: Find some way to render the banner
    // if(data.banner) {
    //     cloudinaryUploader(data.banner).then((url) => {
    //         data.banner = url
    //     }).catch((error) => {
    //         console.log(error)
    //         data.banner = undefined
    //     }).finally(() => {
    //         console.log(data.banner)
    //     })
    // }

    

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                Review Your Event
            </h2>

            {/* Event Details Card */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <div className="flex items-center mb-4">
                    <CalendarCheck className="h-6 w-6 text-indigo-500 mr-2" />
                    <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200">
                        Event Details
                    </h3>
                </div>
                {/*//TODO: Find some way to render the banner*/}
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Banner
                    <Image
                        src={data.banner}
                        alt="event-banner"
                        className="rounded-lg"
                        width={400}
                        height={200}
                    />
                </div> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Title */}
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Title
                        </p>
                        <p className="mt-1 text-lg text-gray-700 dark:text-gray-300">
                            {data.eventName}
                        </p>
                    </div>

                    {/* Description */}
                    <div className="text-wrap">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Description
                        </p>
                        <p className="mt-1 text-lg text-gray-700 dark:text-gray-300 text-ellipsis overflow-hidden">
                            {data.description}
                        </p>
                    </div>

                    {/* Category */}
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Category
                        </p>
                        <p className="mt-1 text-lg text-gray-700 dark:text-gray-300">
                            {data.category}
                        </p>
                    </div>
                </div>
            </div>

            {/* Location and Date Card */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <div className="flex items-center mb-4">
                    <MapPin className="h-6 w-6 text-indigo-500 mr-2" />
                    <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200">
                        Location & Date
                    </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Date */}
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Date
                        </p>
                        <p className="mt-1 text-lg text-gray-700 dark:text-gray-300">
                            {new Date(data.date).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    </div>

                    {/* Location */}
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Location
                        </p>
                        <p className="mt-1 text-lg text-gray-700 dark:text-gray-300">
                            {data.location}
                        </p>
                    </div>
                </div>
            </div>

            {/* Capacity and Tickets Card */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <div className="flex items-center mb-4">
                    <Users className="h-6 w-6 text-indigo-500 mr-2" />
                    <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200">
                        Capacity & Ticket Price
                    </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Capacity */}
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Capacity
                        </p>
                        <p className="mt-1 text-lg text-gray-700 dark:text-gray-300">
                            {data.capacity} attendees
                        </p>
                    </div>

                    {/* Ticket Price */}
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Booking
                        </p>
                        <p className="mt-1 text-lg text-gray-700 dark:text-gray-300">
                            ₹ {data.price}
                        </p>
                    </div>
                </div>
            </div>

            {/* Organizer and Speaker Cards */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 flex flex-col">
                <div className="flex items-center mb-4">
                    <Users className="h-6 w-6 text-indigo-500 mr-2" />
                    <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200">
                        Organizer & Speaker
                    </h3>
                </div>
                <div className="pb-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 py-4">
                        Organizer
                    </p>
                    <AnimatedTooltip items={data.organizers} />
                </div>

                {/* Speaker */}
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 py-4">
                        Speaker
                    </p>
                    <AnimatedTooltip items={data.speakers} />
                </div>
            </div>
        </div>
    );
};

export default Review;
