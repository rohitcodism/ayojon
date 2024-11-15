import { usernameValidation } from "./userValidation.schema";
import { z } from "zod";

export const signUpSchema = z.object({
    username: usernameValidation,
    fullname: z.string(),
    email: z.string().email({ message: "Invalid email address!!" }),
    password: z.string().min(8, "Password must be of at least 8 characters!!").max(20, "Password must be of at most 20 characters!!"),
    confirmPassword: z.string().min(8, "Passwords does not match!!").max(20, "Passwords does not match!!"),
    profilePicture: z.instanceof(File).optional().refine(
        (file) => {
            if(file){
                return ["image/jpeg", "image/png", "image/jpg"].includes(file!.type) && file.size < 1024 * 1024 * 10
            }

            return true
        },
        {message: "Invalid file format or size!!"}
    ),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords does not match!!",
})