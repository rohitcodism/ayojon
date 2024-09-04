'use client'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { eventSchema, defaultEventDate, allowedCategories } from "@/schemas/event.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { ChevronDown, Loader2 } from "lucide-react";
import { DatePicker } from "../events/components/DatePicker";
import { Button } from "@/components/ui/button";
import { useState } from "react";



const CreateEventPage = () => {

    const { toast } = useToast();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const form = useForm<z.infer<typeof eventSchema>>({
        resolver: zodResolver(eventSchema),

        defaultValues: {
            eventName: "",
            description: "",
            category: "Others",
            date: defaultEventDate,
            location: "",
            capacity: 20,
            organizers: [],
            speakers: []
        }
    });

    const onSubmit = async (data: z.infer<typeof eventSchema>) => {
        console.log("Event data: ", data)

        try {

            setIsSubmitting(true)

            // const res = await axios.post('/event/create', data)

            setIsSubmitting(false)

        } catch (error) {
            console.log(error);

            toast({
                title: "Oops!",
                description: "Something went wrong during event creation!!",
                variant: "destructive"
            })
        }
    }

    return (
        <div
            className="
                w-full
                min-h-screen
                flex
                flex-col
                justify-center
                items-center
                gap-8
                py-8
                bg-black
            "
        >
            <div className="w-full max-w-xl p-6 pb-4 space-y-2 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-black dark:text-white">Ayojon</h1>
                    <p className="mb-4 text-gray-600 dark:text-gray-300">Create Event</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                        <FormField
                            control={form.control}
                            name="eventName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="tyohar" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="this is a xyz event..." {...form} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Categories</FormLabel>
                                    <FormControl>
                                            <Select>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Event category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        allowedCategories.map((category) => (
                                                            <SelectItem value={`${category}`}>
                                                                {category}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date</FormLabel>
                                    <FormControl>
                                        <div className="w-full">
                                            <DatePicker />
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="enter the address..." type="text" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Capacity</FormLabel>
                                    <FormControl>
                                        <Input placeholder="enter the capacity of the event..." type="number" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="organizers"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Organizers</FormLabel>
                                    <FormControl>
                                        <Input placeholder="organizers" type="text" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="speakers"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Speakers & Guests</FormLabel>
                                    <FormControl>
                                        <Input placeholder="organizers" type="text" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div
                            className="
                                flex
                                justify-center
                                items-center
                                w-full
                                py-3
                            "
                        >
                            <Button
                                className="
                                    w-full
                                "
                                type="submit"
                            >
                                {
                                    isSubmitting ? <Loader2 className="animate-spin" /> : "Create event"
                                }
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default CreateEventPage;