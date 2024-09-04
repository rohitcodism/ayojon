import { z } from "zod";
import { usernameValidation } from "./userValidation.schema";

export const userSchema = z.object({
    username: usernameValidation,
    email: z.string().email({ message: "Invalid email address!!" })
})