import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest){
    await dbConnect();

    try {

        const { username, otp } = await req.json();

        if(!username || !otp){
            return NextResponse.json(
                {
                    success: false,
                    message: "Username and OTP is required."
                },
                {
                    status: 400
                }
            )
        }

        const user = await UserModel.findOne(
            {
                username
            }
        )

        if(!user){
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found!!"
                },
                {
                    status: 400
                }
            )
        }

        const isCorrectOTP = otp === user.verifyCode;

        const isValidOTP = new Date(Date.now()) < user.verifyCodeExpiry

        if(!isCorrectOTP && isValidOTP){
            return NextResponse.json(
                {
                    success: false,
                    message: "Incorrect Verification Code!!"
                },
                {
                    status: 400
                }
            )
        }
        else if(isCorrectOTP && !isValidOTP){
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid Verification Code!!"
                },
                {
                    status: 400
                }
            )
        }
        else if(!isCorrectOTP && !isValidOTP){
            return NextResponse.json(
                {
                    success: false,
                    message: "Incorrect and Invalid Verification Code!!"
                },
                {
                    status: 400
                }

            )
        }
        else{
            
            user.isVerified = true;

            await user.save();

            return NextResponse.json(
                {
                    success: true,
                    message: "User veirfied successfully!!"
                },
                {
                    status: 200
                }
            )
        }

    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error
            },
            {
                status: 500
            }
        )
    }
}