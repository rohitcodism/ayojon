"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { loginSchema } from '@/schemas/login.shcema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import axios from 'axios';
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';

const Login = () => {

    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const [isEyeOn, setIsEyeOn] = useState<boolean>(false);

    const form = useForm<z.infer<typeof loginSchema>>(
        {
            resolver: zodResolver(loginSchema),

            defaultValues: {
                identifier: "",
                password: ""
            }
        }
    )

    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        setIsSubmitting(true);
        console.log("Login Data: ", data);

        try {

            const res = await signIn('credentials', {
                redirect: false,
                identifier: data.identifier,
                password: data.password
            })

            console.log("login result : ", res)

            toast({
                title: "Success!!",
                description: "User logged in successfully.",
                variant: "default"
            })

            if (res?.error) {
                console.log("Log in error: ", res.error)
                toast({
                    title: "Oops!!",
                    description: "Something went wrong while loggin in.",
                    variant: "destructive"
                })
            } else {
                router.replace("/")
            }

        } catch (error) {
            console.log("Login api error", error)
            toast({
                title: "Oops!!",
                description: "Something went wrong while loggin in.",
                variant: "destructive"
            })
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div
            className='
                flex
                justify-center
                items-center
                bg-gray-100
                dark:bg-black
                gap-8
                py-8
                w-full
                min-h-screen
            '
        >
            <div
                className='
                    p-6
                    pb-4
                    space-y-2
                    bg-white
                    dark:bg-black
                    border-solid
                    border-2
                    border-black
                    dark:border-white
                    rounded-2xl
                    shadow-md
                    w-[40%]
                    h-[50%]
                '
            >
                <div
                    className='text-center'
                >
                    <h1
                        className='
                            text-4xl
                            font-extrabold
                            tracking-tight
                            lg:text-5xl
                            mb-6
                        '
                    >
                        Ayojon
                    </h1>
                    <p
                        className='mb-4 text-lg font-medium'
                    >
                        Login
                    </p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <FormField
                            control={form.control}
                            name="identifier"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username or Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="username or example@coolmail.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className='relative'>
                                            <Input type={isEyeOn ? "text" : "password"} placeholder="hope you have minded it" {...field} />
                                            <div
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                                onClick={() => setIsEyeOn((prev) => !prev)}
                                            >
                                                {isEyeOn ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                            <Button
                                type="submit"
                                size={"lg"}
                                className="self-center w-full cursor-pointer"
                            >
                                {
                                    isSubmitting ? <Loader2 className="animate-spin" /> : "Log in"
                                }
                            </Button>
                    </form>
                    <div
                        className='
                            flex
                            flex-col
                            justify-center
                            items-center
                            py-2
                            gap-2
                        '
                    >
                        <Button
                            size={"lg"}
                            className="self-center w-full cursor-pointer"
                            onClick={() => {signIn("google", { callbackUrl: "/" })}}
                        >
                            Sign in with Google
                        </Button>
                        <Link
                            href={"/signup"}
                        >
                            <p
                                className="
                                    hover:text-black
                                    text-gray-600
                                    text-decoration-line: underline
                                "
                            >
                                Not registered yet ?
                            </p>
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Login;