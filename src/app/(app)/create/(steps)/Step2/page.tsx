import React, { useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CalendarCheck2, CalendarIcon, MapPin } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const Step2 = () => {
    const { control } = useFormContext(); // Access form context

    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-8 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                Step 2
            </h2>

            {/* Date Field */}
            <FormField
                control={control}
                name="date"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <FormLabel className="flex items-center text-gray-700 dark:text-gray-200 text-lg font-medium">
                            <CalendarCheck2 className="h-5 w-5 mr-2 text-indigo-500" />
                            Date
                        </FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full pl-3 text-left font-normal dark:bg-gray-700",
                                            !field.value && "text-muted-foreground"
                                        )}
                                    >
                                        {field.value ? (
                                            format(new Date(field.value), "PPP")  // Ensure correct date formatting
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value ? new Date(field.value) : undefined}  // Convert string to Date
                                    onSelect={(date) => {
                                        field.onChange(date);  // Ensure the date updates the form's state
                                    }}
                                    disabled={(date) => date < new Date()}
                                    initialFocus
                                    className="dark:bg-gray-700"
                                />
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Location Field */}
            <FormField
                name="location"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex items-center text-gray-700 dark:text-gray-200 text-lg font-medium">
                            <MapPin className="h-5 w-5 mr-2 text-indigo-500" />
                            Location
                        </FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Enter the event location"
                                type="text"
                                {...field}
                                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};

export default Step2;
