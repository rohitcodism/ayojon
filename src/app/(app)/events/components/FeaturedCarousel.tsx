import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { featuredEvents } from "../../../../../constants";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export const FeaturedCarousel = () => {
    const totalEvents = featuredEvents.length;
    const [currentIndex, setCurrentIndex] = useState(totalEvents); // Start in the duplicated middle set
    const transitionRef = useRef(true); // Control smooth transitions

    // Handle auto-slide every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            slideToNext();
        }, 5000); // Adjust the interval duration

        return () => clearInterval(interval); // Cleanup on unmount
    }, [currentIndex]);

    // Smooth slide to the next
    const slideToNext = () => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    // Smooth slide to the previous
    const slideToPrev = () => {
        setCurrentIndex((prevIndex) => prevIndex - 1);
    };

    // Adjust carousel to create the infinite effect
    useEffect(() => {
        if (!transitionRef.current) {
            return;
        }

        const handleTransitionEnd = () => {
            // Reset index without animation when sliding out of bounds
            if (currentIndex === totalEvents * 2) {
                transitionRef.current = false;
                setCurrentIndex(totalEvents);
            } else if (currentIndex === totalEvents - 1) {
                transitionRef.current = false;
                setCurrentIndex(totalEvents * 2 - 1);
            }
        };

        document
            .querySelector(".carousel-content") // Select the sliding container
            ?.addEventListener("transitionend", handleTransitionEnd);

        return () => {
            document
                .querySelector(".carousel-content")
                ?.removeEventListener("transitionend", handleTransitionEnd);
        };
    }, [currentIndex, totalEvents]);

    // Enable smooth transition after resetting
    useEffect(() => {
        if (!transitionRef.current) {
            setTimeout(() => {
                transitionRef.current = true;
            }, 50); // Small delay before re-enabling transitions
        }
    }, [currentIndex]);

    // Get the carousel content
    const infiniteEvents = [
        ...featuredEvents, // Duplicate for looping
        ...featuredEvents,
    ];

    return (
        <div className="h-[500px] w-full py-4 relative overflow-hidden">
            <Carousel>
                <CarouselContent
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${(currentIndex - totalEvents) * 100}%)`,
                        transition: transitionRef.current ? "transform 0.5s ease-in-out" : "none",
                    }}
                >
                    {infiniteEvents.map((event, index) => (
                        <CarouselItem key={index} className="w-full flex justify-center items-center">
                            {/* Event Card */}
                            <div className="relative w-[100%] h-[400px] rounded-lg shadow-lg overflow-hidden">
                                {/* Event Background Image */}
                                <Image
                                    src={event.image}
                                    alt={event.name}
                                    layout="fill"
                                    objectFit="cover"
                                    priority
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                                {/* Event Info */}
                                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/60 to-transparent p-4 text-white">
                                    <h3 className="text-lg font-bold">{event.name}</h3>
                                    <p className="text-sm line-clamp-2">{event.category}</p>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {/* Prev and Next Buttons */}
                <CarouselPrevious
                    className="absolute left-2 top-1/2 transform -translate-y-1/2"
                    onClick={slideToPrev}
                />
                <CarouselNext
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={slideToNext}
                />
            </Carousel>
        </div>
    );
};
