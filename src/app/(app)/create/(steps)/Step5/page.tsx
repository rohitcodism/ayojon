import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { Image } from "lucide-react";


export const Step5 = () => {

    const { control } = useFormContext();

    return (
        <div
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-8 space-y-6"
        >
            <FormField
                control={control}
                name="banner"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel
                            className="flex items-center text-gray-700 dark:text-gray-200 text-lg font-medium"
                        >
                            <Image className="h-5 w-5 mr-2 text-indigo-500" />
                            Choose a banner for your event
                        </FormLabel>
                        <FormControl>
                            <Input
                                type="file"
                                placeholder="Upload a banner for your event"
                                accept="image/*"
                                className="cursor-pointer dark:bg-gray-700 dark:text-white"
                                onChange={(e) => {
                                    const file = e.target.files ? e.target.files[0] : null;
                                    field.onChange(file);
                                }}
                                onBlur={field.onBlur}
                                ref={field.ref}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}