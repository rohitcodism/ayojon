"use client"
import { Categories } from "./components/Categories";
import { featuredEvents } from "../../../../constants";
import { FeaturedEventCard } from "@/app/components/FeaturedEventCard";
import { GlobalContextProvider, useGlobalContext } from "../../../../context/GlobalContext";
import { EventPage } from "./components/EventPage";



export default function Event() {

    return (
        <GlobalContextProvider>
            <div>
                <EventPage />
            </div>
        </GlobalContextProvider>
    );
}