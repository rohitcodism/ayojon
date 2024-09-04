"use client";

import { signUpSchema } from "@/schemas/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDebounceCallback } from "usehooks-ts";
import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Divide, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import GoogleIcon from "../../../../public/assets/icons8-google.svg";
import Image from "next/image";


const SignUp = () => {
    const router = useRouter();

    const [username, setUsername] = useState("");

    const [usernameMessage, setUsernameMessage] = useState("");

    const [isCheckingUsername, setIsCheckingUsername] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const debounced = useDebounceCallback(setUsername, 500);

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),

        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            profilePicture: undefined,
        },
    });

    useEffect(() => {
        const checkingUsername = async () => {
            setIsCheckingUsername(true);

            setUsernameMessage("");

            try {
                const res = await axios.get(`/api/uniquename/?username=${username}`);

                setUsernameMessage(res.data.message);
            } catch (error) {
                const axiosError = error as AxiosError<NextResponse>;

                console.log("Unique username error: ", axiosError);
            } finally {
                setIsCheckingUsername(false);
            }
        };
        checkingUsername();
    }, [username]);

    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        setIsSubmitting(true);

        console.log("Function submit called!!");

        try {
            console.log("Form data received: ", data);

            const formData = new FormData();

            formData.append("username", data.username);
            formData.append("email", data.email);
            formData.append("password", data.password);

            if (data.profilePicture != undefined) {
                formData.append("profilePicture", data.profilePicture);
            }

            console.log("formData: ", formData);

            const res = await axios.post(`/api/signup`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Response from Sign up API", res);

            router.replace("/");
        } catch (error) {
            console.log("Error from signup API: ", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-black gap-8 py-8">
            <div className="w-full max-w-lg p-6 pb-4 space-y-2 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-black dark:text-white">Ayojon</h1>
                    <p className="mb-4 text-gray-600 dark:text-gray-300">Sign up</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="what should we call you"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                debounced(e.target.value);
                                            }}
                                            className="dark:bg-gray-700 dark:text-white"
                                        />
                                    </FormControl>
                                    {isCheckingUsername && <Loader2 className="animate-spin" />}
                                    <p className={`text-sm ${usernameMessage === "Username is available!!" ? "text-green-500" : "text-red-500"} font-medium`}>
                                        {usernameMessage}
                                    </p>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="example@coolmail.com" {...field} className="dark:bg-gray-700 dark:text-white" />
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
                                        <Input placeholder="keep it secret but mind it" {...field} className="dark:bg-gray-700 dark:text-white" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="kept it ?" {...field} className="dark:bg-gray-700 dark:text-white" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="profilePicture"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Choose a profile picture</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            placeholder="give it a good look"
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
                        <Button type="submit" size={"lg"} className="self-center w-full cursor-pointer dark:bg-blue-600 dark:text-white">
                            {isSubmitting ? <Loader2 className="animate-spin" /> : "Sign up"}
                        </Button>
                    </form>
                    <div className="flex flex-col justify-center items-center py-2 gap-2">
                        <Button size={"lg"} className="self-center w-full cursor-pointer dark:bg-blue-600 dark:text-white" onClick={() => signIn("google")}>
                            {isSubmitting ? <Loader2 className="animate-spin" /> : (<div className="flex justify-center items-center gap-4">Sign up with Google <Image src={GoogleIcon} alt="google-icon" height={20} width={20} /></div>)}
                        </Button>
                        <Link href={"/login"}>
                            <p className="hover:text-black text-gray-600 dark:text-gray-300 dark:hover:text-white underline">Already a member?</p>
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default SignUp;
