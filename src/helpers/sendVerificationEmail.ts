import { resend } from "@/lib/resend"
import VerificationEmail from "../../emails/VerificationEmail"
import { NextResponse } from "next/server"



export async function sendVerificationEmail(
    email: string,
    username: string,
    otp: string,
):Promise<NextResponse>{

    try {
        
        const result = await resend.emails.send(
            {
                from: "onboarding@resend.dev",
                to: email,
                subject: "Ayojon | User Verification Code",
                text: "Your verification code is: " + otp,
                react: VerificationEmail({ username, otp })
            }
        )

        console.log(result);

        if(result.data){
            return NextResponse.json(
                {
                    success: true,
                    message: `Email sent successfully to ${email}`
                },
                {
                    status: 200
                }
            )
        }

        return NextResponse.json(
            {
                success: false,
                message: `Something went wrong!`
            },
            {
                status: 500
            }
        )

    } catch (error) {
        return NextResponse.json(
            {
                error
            },
            {
                status: 500
            }
        )
    }
}