// src/pages/create-event/steps/Step1.tsx
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { allowedCategories } from "@/schemas/event.schema";
import { TextCursor, ReceiptText, CircleDot } from "lucide-react";

const Step1 = () => {
    const { control, watch } = useFormContext(); // Access form context

    const eventName = watch("eventName")
    const category = watch("category")
    const description = watch("description")

    const isNextButtonDisabled = !eventName || !category || !description

    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-8 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                Step 1
            </h2>

            {/* Event Name Field */}
            <FormField
                name="eventName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex items-center text-gray-700 dark:text-gray-200 text-lg font-medium">
                            <TextCursor className="h-5 w-5 mr-2 text-indigo-500" />
                            Title
                        </FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Enter your event title"
                                {...field}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Description Field */}
            <FormField
                name="description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex items-center text-gray-700 dark:text-gray-200 text-lg font-medium">
                            <ReceiptText className="h-5 w-5 mr-2 text-indigo-500" />
                            Description
                        </FormLabel>
                        <FormControl>
                            {/* Using Textarea instead of Input for better UX */}
                            <textarea
                                {...field}
                                placeholder="Provide a detailed description of your event..."
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 p-3 resize-none min-h-[100px]"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Category Field */}
            <FormField
                name="category"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex items-center text-gray-700 dark:text-gray-200 text-lg font-medium">
                            <CircleDot className="h-5 w-5 mr-2 text-indigo-500" />
                            Category
                        </FormLabel>
                        <FormControl>
                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {allowedCategories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};

export default Step1;
