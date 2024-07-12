"use client"

import { z } from "zod"

const formSchema = z.object({
    username: z.string().min(5).max(12),
})

const SignUp = () => {

}