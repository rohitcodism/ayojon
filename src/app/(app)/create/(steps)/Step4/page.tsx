// src/pages/create-event/steps/Step4.tsx
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
import { Speaker, IndianRupee } from "lucide-react";

const Step4 = () => {
    const { register, setValue, watch } = useFormContext();
    const [speakerSearch, setSpeakerSearch] = useState<string>("");
    const debouncedSpeaker = useDebounceCallback(setSpeakerSearch, 500);
    const [speakers, setSpeakers] = useState<User[]>([]);
    const [selectedSpeakers, setSelectedSpeakers] = useState<User[]>([]);

    const handleSpeakerSelect = (speaker: User) => {
        if (!selectedSpeakers.find((s) => s.id === speaker.id)) {
            setSelectedSpeakers([...selectedSpeakers, speaker]);
            setValue("speakers", [...selectedSpeakers, speaker]);
        }
        setSpeakerSearch("");
    };

    const handleSpeakerRemove = (speaker: User) => {
        const updated = selectedSpeakers.filter((s) => s.id !== speaker.id);
        setSelectedSpeakers(updated);
        setValue("speakers", updated);
    };

    useEffect(() => {
        const getSearchedSpeakers = async () => {
            try {
                if (speakerSearch.length) {
                    const res = await axios.get(`/api/searchUser/?identifier=${speakerSearch}`);
                    setSpeakers(res.data.data);
                } else {
                    setSpeakers([]);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getSearchedSpeakers();
    }, [speakerSearch]);

    return (
        <>
            {/* Add option to select speakers and guests, currently it's a little bit deffective work on that */}
            {/* <FormField
                name="speakers"
                render={() => (
                    <FormItem>
                        <FormLabel className="text-xl font-bold flex gap-2 items-center"><Speaker /> Speakers & Guests</FormLabel>
                        <FormControl>
                            <div className="relative">
                                <div className="flex items-center gap-2 flex-wrap w-full rounded-lg px-3 py-3 focus-within:ring-1 bg-slate-950 dark:bg-gray-700 border-2 border-solid focus-within:border-gray-300">
                                    {selectedSpeakers.map((speaker) => (
                                        <Badge key={speaker.id} className="flex items-center space-x-2">
                                            <span>{speaker.username}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleSpeakerRemove(speaker)}
                                                className="ml-1 text-xs text-gray-600 hover:text-gray-900"
                                            >
                                                ✕
                                            </button>
                                        </Badge>
                                    ))}
                                    <input
                                        {...register("speakers")}
                                        value={speakerSearch}
                                        className="flex-1 border-none focus:outline-none bg-slate-950 dark:bg-gray-700 rounded-md px-2"
                                        placeholder="Search for speakers & guests..."
                                        onChange={(e) => {
                                            debouncedSpeaker(e.target.value);
                                        }}
                                    />
                                </div>
                                {(speakerSearch.length && speakers.length > 0) ? (
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
                                {(speakerSearch.length && speakers.length === 0) ? (
                                    <div className="absolute w-full bg-slate-900 text-white max-h-40 overflow-y-auto p-2 mt-2 rounded-md shadow-md z-10">
                                        <div className="py-2 px-4 text-gray-400">No user found</div>
                                    </div>
                                ) : null}
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            /> */}
                        {/* Add option to select organizers, currently it's a little bit deffective work on that */}
            {/* <FormField
                name="organizers"
                render={() => (
                    <FormItem>
                        <FormLabel className="flex items-center text-gray-700 dark:text-gray-200 text-lg font-medium"><Building2 className="h-5 w-5 mr-2 text-indigo-500"/>Organizers</FormLabel>
                        <FormControl>
                            <div className="relative">
                                <div className="flex items-center gap-2 flex-wrap w-full rounded-lg px-3 py-3 focus-within:ring-1 bg-slate-950 dark:bg-gray-700 border-2 border-solid focus-within:border-gray-300">
                                    {selectedOrganizers.map((organizer) => (
                                        <Badge key={organizer.id} className="flex items-center space-x-2">
                                            <span>{organizer.username}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleOrgRemove(organizer)}
                                                className="ml-1 text-xs text-gray-600 hover:text-gray-900"
                                            >
                                                ✕
                                            </button>
                                        </Badge>
                                    ))}
                                    <input
                                        {...register("organizers")}
                                        value={organizerSearch}
                                        className="flex-1 border-none focus:outline-none dark:bg-gray-700 rounded-md px-2"
                                        placeholder="Search for organizers..."
                                        onChange={(e) => {
                                            debouncedOrganizer(e.target.value);
                                        }}
                                    />
                                </div>
                                {(organizerSearch.length && organizers.length > 0) ? (
                                    <div className="absolute w-full bg-slate-900 text-white max-h-40 overflow-y-auto p-2 mt-2 rounded-md shadow-md z-10">
                                        {organizers.map((organizer) => (
                                            <div
                                                key={organizer.id}
                                                className="flex items-center gap-4 py-2 px-4 hover:bg-slate-800 cursor-pointer"
                                                onClick={() => handleOrgSelect(organizer)}
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
                                {(organizerSearch.length && organizers.length === 0) ? (
                                    <div className="absolute w-full bg-slate-900 text-white max-h-40 overflow-y-auto p-2 mt-2 rounded-md shadow-md z-10">
                                        <div className="py-2 px-4 text-gray-400">No user found</div>
                                    </div>
                                ) : null}
                            </div>
                        </FormControl>
                        {/* <FormMessage />
                    </FormItem>
                )}
            /> */}
        </>
    );
};

export default Step4;
