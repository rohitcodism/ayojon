"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { userVeificationSchema } from "@/schemas/userVerify.schema"
import axios from "axios"
import { useRouter } from "next/navigation"


const Verify = () => {

    const form = useForm<z.infer<typeof userVeificationSchema>>({
        resolver: zodResolver(userVeificationSchema),
        defaultValues: {
            otp: "",
        }
    })

    const { toast } = useToast();

    const router = useRouter();

    const onSubmit = async (data: z.infer<typeof userVeificationSchema>) => {
        console.log("OTP: ", data.otp);

        try {
            const res = axios.post('/api/verifyUser', data.otp)

            console.log(res);

            toast({
                title: "Success!!",
                description: "User verified successfully.",
                variant: "default"
            })

            router.replace('/login')

        } catch (error) {
            console.log(error);
            toast({
                title: "Oops!!",
                description: "Something went wrong while verifying the user.",
                variant: "destructive"
            })
        }
    }

    return (
        <div className="flex flex-col gap-8 justify-center items-center w-screen min-h-screen bg-white dark:bg-black">
            <div className="flex flex-col gap-8 justify-center items-center rounded-2xl w-[40%] h-[20%] p-8 border-2 border-solid border-black dark:border-white">
                <div className="flex flex-col gap-2 justify-center items-center">
                    <h1 className="text-4xl text-white font-extrabold">
                        Ayojon
                    </h1>
                    <p className="text-base font-semibold">
                        Verify user
                    </p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-8 justify-center items-center">
                        <FormField
                            control={form.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <InputOTP maxLength={6} {...field}>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormDescription className="flex justify-center items-center">
                                        Please enter the one-time password sent to email.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button className="w-[60%] text-center font-semibold text-lg" type="submit">Verify</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default Verify;