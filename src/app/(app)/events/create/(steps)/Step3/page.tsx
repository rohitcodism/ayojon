import React from "react";
import { useFormContext } from "react-hook-form";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Users, IndianRupee } from "lucide-react";

const Step3 = () => {
    const { control } = useFormContext(); // Access form context

    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-8 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                Step 3
            </h2>

            {/* Capacity Field */}
            <FormField
                name="capacity"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex items-center text-gray-700 dark:text-gray-200 text-lg font-medium">
                            <Users className="h-5 w-5 mr-2 text-indigo-500" />
                            Capacity
                        </FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Enter the capacity of the event..."
                                {...field}
                                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Ticket Price Field */}
            <FormField
                name="price"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex items-center text-gray-700 dark:text-gray-200 text-lg font-medium">
                            <IndianRupee className="h-5 w-5 mr-2 text-indigo-500" />
                            Ticket Price
                        </FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Enter the ticket price..."
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

export default Step3;
