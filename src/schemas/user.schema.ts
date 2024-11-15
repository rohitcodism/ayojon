import { z } from "zod";
import { usernameValidation } from "./userValidation.schema";

export const userSchema = z.object({
    id: z.string(),
    username: usernameValidation,
    email: z.string().email({ message: "Invalid email address!!" }),
    profilePicture: z.string().optional()
})