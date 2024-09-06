import { z } from "zod";



const userVeificationSchema = z.object({
    verificationCode: z.string().min(6, "Invalid OTP").max(6, "Invalid OTP")
})

export{
    userVeificationSchema
}