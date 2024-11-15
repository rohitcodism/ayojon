// src/pages/create-event/MultiStepForm.tsx
"use client";

import React, { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema, defaultEventDate } from "@/schemas/event.schema";
import { z } from "zod";
import Step1 from "./(steps)/Step1/pages";
import Step2 from "./(steps)/Step2/page";
import Step3 from "./(steps)/Step3/page";
import Step4 from "./(steps)/Step4/page";
import Review from "./(steps)/Review/page";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Step5 } from "./(steps)/Step5/page";
import { useSession } from "next-auth/react";

// Define the form's data structure
type FormData = z.infer<typeof eventSchema>;

const MultiStepForm = () => {

    const methods = useForm<FormData>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            eventName: "",
            description: "",
            category: "Others",
            date: defaultEventDate,
            location: "",
            capacity: '20',
            price: '0',
            banner: undefined,
            organizers: [],
            speakers: [],
            owner: ""
        },
    });

    const { handleSubmit, formState: { isValid } } = methods;
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const { toast } = useToast();
    const router = useRouter();

    const { data: session } = useSession();

    console.log(methods.getValues());

    const onSubmit: SubmitHandler<FormData> = async (data) => {

        const formData = new FormData();

        formData.append("eventName", data.eventName )
        formData.append("description", data.description )
        formData.append("category", data.category )
        formData.append("date", data.date.toString() )
        formData.append("location", data.location )
        formData.append("capacity", data.capacity )
        formData.append("price", data.price )
        formData.append("organizers", JSON.stringify(data.organizers) )
        formData.append("speakers", JSON.stringify(data.speakers) )
        formData.append("owner", session?.user._id as string)

        console.log(JSON.stringify(data.organizers));

        if (data.banner != undefined) {
            formData.append("banner", data.banner);
        }

        try {
            setIsSubmitting(true);
            // API endpoint for event creation

            const res = await axios.post('/api/event/create', formData,{
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            setIsSubmitting(false);
            toast({
                title: "Success!",
                description: "Event created successfully.",
            });
            // Optionally, redirect or reset the form
            router.push('/events');
        } catch (error) {
            console.log(error);
            setIsSubmitting(false);
            toast({
                title: "Oops!",
                description: "Something went wrong during event creation!",
                variant: "destructive",
            });
        }
    };

    const nextStep = () => setCurrentStep((prev) => prev + 1);
    const prevStep = () => setCurrentStep((prev) => prev - 1);

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center gap-8 py-8 bg-black">
            <div className="w-full max-w-xl p-6 pb-4 space-y-2 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-black dark:text-white">
                        Ayojon
                    </h1>
                    <p className="mb-4 text-gray-600 dark:text-gray-300">Create Event</p>
                </div>
                {/* Wrap the form with FormProvider to provide form context to all children */}
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
                        {currentStep === 1 && <Step1 />}
                        {currentStep === 2 && <Step2 />}
                        {currentStep === 3 && <Step3 />}
                        {currentStep === 4 && <Step4 />}
                        {currentStep === 5 && <Step5 />}
                        {currentStep === 6 && <Review />}

                        <div className="flex justify-between mt-4">
                            {currentStep < 6 && (
                                <Button size={'lg'} type="button" variant="outline" onClick={prevStep} className="bg-transparent border-2 border-white">
                                    Back
                                </Button>
                            )}
                            {currentStep === 6 && (
                                <Button size={'lg'} type="button" variant="outline" onClick={() => setCurrentStep(1)} className="bg-transparent border-2 border-white">
                                    Edit Event
                                </Button>
                            )}
                            {currentStep < 6 && (
                                <Button type="button" size={'lg'} onClick={nextStep}>
                                    Next
                                </Button>
                            )}
                            {currentStep === 6 && (
                                <Button type="submit" size={'lg'}>
                                    {isSubmitting ? <Loader2 className="animate-spin" /> : "Create Event"}
                                </Button>
                            )}
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};

export default MultiStepForm;
