import { z } from "zod";
import { usernameValidation } from "./userValidation.schema";

const emailValidation = z.string().email("Invalid email address!!")

export const loginSchema = z.object(
    {
        identifier: z.union([usernameValidation, emailValidation]), 
        password: z.string().min(8, "Password must be of at least 8 characters!!").max(20, "Password must be of at most 20 characters!!"),
    }
)