"use client"
import { GlobalContextProvider, useGlobalContext } from "../../../../context/GlobalContext";
import { EventPage } from "./components/EventPage";
import { Navbar } from "./components/Navbar";



export default function Event() {

    return (
        <GlobalContextProvider>
            <div>
                <Navbar />
                <EventPage />
            </div>
        </GlobalContextProvider>
    );
}