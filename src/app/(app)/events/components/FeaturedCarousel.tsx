import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { featuredEvents } from "../../../../../constants";
import Image from "next/image";
import { useState, useEffect } from "react";

export const FeaturedCarousel = () => {
    const totalEvents = featuredEvents.length;

    // Duplicate featured events for infinite looping
    const infiniteEvents = [...featuredEvents, ...featuredEvents];

    const [currentIndex, setCurrentIndex] = useState(totalEvents); // Start at the first duplicate
    const [isTransitioning, setIsTransitioning] = useState(true); // Controls smooth transition

    // Slide to the next item
    const slideToNext = () => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    // Slide to the previous item
    const slideToPrev = () => {
        setCurrentIndex((prevIndex) => prevIndex - 1);
    };

    // Auto-slide every 5 seconds
    useEffect(() => {
        const interval = setInterval(slideToNext, 5000);
        return () => clearInterval(interval);
    }, []);

    // Reset position without animation when out of bounds
    useEffect(() => {
        if (currentIndex === totalEvents * 2) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(totalEvents); // Reset to the start of the original duplicate set
            }, 500); // Match transition duration
        } else if (currentIndex === totalEvents - 1) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(totalEvents * 2 - 1); // Reset to the end of the original duplicate set
            }, 500);
        } else {
            setIsTransitioning(true);
        }
    }, [currentIndex, totalEvents]);

    return (
        <div className="h-[500px] w-full py-4 relative overflow-hidden">
            <Carousel>
                <CarouselContent
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${(currentIndex - totalEvents) * 100}%)`,
                        transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
                    }}
                >
                    {infiniteEvents.map((event, index) => (
                        <CarouselItem key={index} className="w-full flex justify-center items-center">
                            <div className="relative w-[100%] h-[400px] rounded-lg shadow-lg overflow-hidden">
                                <Image
                                    src={event.image}
                                    alt={event.name}
                                    layout="fill"
                                    objectFit="cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/60 to-transparent p-4 text-white">
                                    <h3 className="text-lg font-bold">{event.name}</h3>
                                    <p className="text-sm line-clamp-2">{event.category}</p>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Navigation Buttons */}
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
