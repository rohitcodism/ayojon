import { z } from "zod";



const userVeificationSchema = z.object({
    otp: z.string().length(6, "OTP must contain 6 numbers!!")
})

export{
    userVeificationSchema
}