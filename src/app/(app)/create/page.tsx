'use client'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { eventSchema, defaultEventDate } from "@/schemas/event.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";



const CreateEventPage = () => {

    const { toast } = useToast();

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

            // const res = await axios.post('/event/create', data)

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
            "
        >
            <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-black dark:text-white">Ayojon</h1>
                <p className="mb-4 text-gray-600 dark:text-gray-300">Create Event</p>
            </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-[100%]">
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

                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
        </div>
    );
}

export default CreateEventPage;