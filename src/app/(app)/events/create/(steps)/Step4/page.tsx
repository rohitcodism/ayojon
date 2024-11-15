import React, { useState, useEffect } from "react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { useDebounceCallback } from "usehooks-ts";
import axios from "axios";
import { User } from "@/models/user.model";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Speaker, Building2, X } from "lucide-react"; // Organizers icon

const Step4 = () => {
    const { setValue } = useFormContext();

    // State for Speakers
    const [speakers, setSpeakers] = useState<User[]>([]);
    const [selectedSpeakers, setSelectedSpeakers] = useState<User[]>([]);

    // State for Organizers
    const [organizers, setOrganizers] = useState<User[]>([]);
    const [selectedOrganizers, setSelectedOrganizers] = useState<User[]>([]);

    // Input Element Reference
    const speakerInputRef = React.useRef<HTMLInputElement>(null);
    const organizerInputRef = React.useRef<HTMLInputElement>(null);

    // Debounced function for fetching speakers
    const fetchSpeakers = useDebounceCallback(async (searchTerm: string) => {

        console.log("searchTerm: ", searchTerm);

        if (searchTerm.length >= 1) {
            try {
                const res = await axios.get(`/api/searchUser/?identifier=${searchTerm}`);
                console.log("res: ", res.data.data);
                setSpeakers(res.data.data);
            } catch (error) {
                console.error(error);
            }
        } else {
            setSpeakers([]);
        }
    }, 500); // Adjust debounce delay as needed

    // Debounced function for fetching organizers
    const fetchOrganizers = useDebounceCallback(async (searchTerm: string) => {
        if (searchTerm.length >= 1) {
            try {
                const res = await axios.get(`/api/searchUser/?identifier=${searchTerm}`);
                setOrganizers(res.data.data);
            } catch (error) {
                console.error(error);
            }
        } else {
            setOrganizers([]);
        }
    }, 500); // Adjust debounce delay as needed

    // Handle Speaker Selection
    const handleSpeakerSelect = (speaker: User) => {
        if (!selectedSpeakers.find((s) => s.id === speaker.id)) {
            speaker.username = speaker.username.toLowerCase();
            speaker.username = speaker.username.split(" ").join("");
            console.log("speaker: ", speaker);
            const updatedSpeakers = [...selectedSpeakers, speaker];
            setSelectedSpeakers(updatedSpeakers);
            setValue("speakers", updatedSpeakers); // Update form field value
        }
        speakerInputRef.current!.value = ""; // Clear search input
    };

    // Handle Speaker Removal
    const handleSpeakerRemove = (speaker: User) => {
        const updated = selectedSpeakers.filter((s) => s.id !== speaker.id);
        setSelectedSpeakers(updated);
        setValue("speakers", updated); // Update form field value
    };

    // Handle Organizer Selection
    const handleOrganizerSelect = (organizer: User) => {
        if (!selectedOrganizers.find((s) => s.id === organizer.id)) {
            organizer.username = organizer.username.toLowerCase();
            organizer.username = organizer.username.split(" ").join("");
            console.log("organizer: ", organizer);
            const updatedOrganizers = [...selectedOrganizers, organizer];
            setSelectedOrganizers(updatedOrganizers);
            setValue("organizers", updatedOrganizers); // Update form field value
        }
        organizerInputRef.current!.value = ""; // Clear search input
    };

    // Handle Organizer Removal
    const handleOrganizerRemove = (organizer: User) => {
        const updated = selectedOrganizers.filter((s) => s.id !== organizer.id);
        setSelectedOrganizers(updated);
        setValue("organizers", updated); // Update form field value
    };

    return (
        <>
            {/* Speakers Section */}
            <FormField
                name="speakers"
                render={() => (
                    <FormItem>
                        <FormLabel className="text-xl font-bold flex gap-2 items-center">
                            <Speaker /> Speakers & Guests
                        </FormLabel>
                        <FormControl>
                            <div className="relative">
                                <div className="flex items-center gap-2 flex-wrap w-full rounded-lg px-3 py-3 focus-within:ring-1 bg-slate-950 dark:bg-gray-700 border-2 border-solid focus-within:border-gray-300">
                                    {selectedSpeakers.map((speaker) => (
                                        <Badge key={speaker.id} className="flex items-center gap-1 py-1">
                                            <Image
                                                src={speaker.profilePicture}
                                                alt={speaker.username}
                                                height={25}
                                                width={25}
                                                className="rounded-full"
                                            />
                                            <span>{speaker.username}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleSpeakerRemove(speaker)}
                                                className="pl-1 text-base font-medium text-gray-600 hover:text-red-600"
                                            >
                                                <X />
                                            </button>
                                        </Badge>
                                    ))}
                                    <input
                                        ref={speakerInputRef}
                                        className="flex-1 border-none focus:outline-none bg-slate-950 dark:bg-gray-700 rounded-md px-2"
                                        placeholder="Search for speakers & guests..."
                                        onChange={(e) => fetchSpeakers(e.target.value)}
                                    />
                                </div>
                                {(speakerInputRef.current?.value !== "" && speakers.length > 0) ? (
                                    <div className="absolute w-full bg-slate-900 text-white max-h-40 overflow-y-auto p-2 mt-2 rounded-md shadow-md z-10">
                                        {speakers.map((speaker) => (
                                            <div
                                                key={speaker.id}
                                                className="flex items-center gap-4 py-2 px-4 hover:bg-slate-800 cursor-pointer"
                                                onClick={() => handleSpeakerSelect(speaker)}
                                            >
                                                <Image
                                                    src={speaker.profilePicture}
                                                    alt={speaker.username}
                                                    height={25}
                                                    width={25}
                                                    className="rounded-full"
                                                />
                                                <p className="text-base font-semibold">{speaker.username}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : null}
                                {(speakerInputRef.current?.value !== "" && speakers.length === 0) ? (
                                    <div className="absolute w-full bg-slate-900 text-white max-h-40 overflow-y-auto p-2 mt-2 rounded-md shadow-md z-10">
                                        <div className="py-2 px-4 text-gray-400">No user found</div>
                                    </div>
                                ) : null}
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Organizers Section */}
            <FormField
                name="organizers"
                render={() => (
                    <FormItem>
                        <FormLabel className="text-xl font-bold flex gap-2 items-center">
                            <Building2 /> Organizers
                        </FormLabel>
                        <FormControl>
                            <div className="relative">
                                <div className="flex items-center gap-2 flex-wrap w-full rounded-lg px-3 py-3 focus-within:ring-1 bg-slate-950 dark:bg-gray-700 border-2 border-solid focus-within:border-gray-300">
                                    {selectedOrganizers.map((organizer) => (
                                        <Badge key={organizer.id} className="flex items-center py-1 gap-1">
                                                <Image
                                                    src={organizer.profilePicture}
                                                    alt={organizer.username}
                                                    height={25}
                                                    width={25}
                                                    className="rounded-full"
                                                />
                                            <span>{organizer.username}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleOrganizerRemove(organizer)}
                                                className="pl-1 text-base font-medium text-gray-600 hover:text-red-600"
                                            >
                                                <X />
                                            </button>
                                        </Badge>
                                    ))}
                                    <input
                                        ref={organizerInputRef}
                                        className="flex-1 border-none focus:outline-none bg-slate-950 dark:bg-gray-700 rounded-md px-2"
                                        placeholder="Search for organizers..."
                                        onChange={(e) => fetchOrganizers(e.target.value)}
                                    />
                                </div>
                                {(  organizerInputRef.current?.value !== "" && organizers.length > 0) ? (
                                    <div className="absolute w-full bg-slate-900 text-white max-h-40 overflow-y-auto p-2 mt-2 rounded-md shadow-md z-10">
                                        {organizers.map((organizer) => (
                                            <div
                                                key={organizer.id}
                                                className="flex items-center gap-4 py-2 px-4 hover:bg-slate-800 cursor-pointer"
                                                onClick={() => handleOrganizerSelect(organizer)}
                                            >
                                                <Image
                                                    src={organizer.profilePicture}
                                                    alt={organizer.username}
                                                    height={25}
                                                    width={25}
                                                    className="rounded-full"
                                                />
                                                <p className="text-base font-semibold">{organizer.username}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : null}
                                {( organizerInputRef.current?.value !== "" && organizers.length === 0) ? (
                                    <div className="absolute w-full bg-slate-900 text-white max-h-40 overflow-y-auto p-2 mt-2 rounded-md shadow-md z-10">
                                        <div className="py-2 px-4 text-gray-400">No user found</div>
                                    </div>
                                ) : null}
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    );
};

export default Step4;
