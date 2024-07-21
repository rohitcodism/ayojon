"use client"
import { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { eventTypes } from "../../../constants";
import { EventCard } from "./EventCard";

const Events = () => {
    const controls = useAnimation();
    const { ref, inView } = useInView({
        threshold: 0.1
    });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [controls, inView]);

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

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
            <div className="flex flex-col gap-2 pb-2">
                <h1 className="text-4xl font-bold">Discover the best events</h1>
                <p className="text-md font-semibold">
                    We offer a wide range of events, from music festivals and tech conferences to stand-up comedy shows
                </p>
            </div>
            <motion.div
                className="flex items-center gap-16 pt-8"
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={controls}
            >
                {eventTypes.map((eventType) => (
                    <motion.div key={eventType.title} variants={itemVariants} whileHover={{ scale: 1.05 }}>
                        <EventCard title={eventType.title} image={eventType.image} />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Events;
