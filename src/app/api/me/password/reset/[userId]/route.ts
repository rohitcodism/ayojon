import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { hashPassword } from "@/helpers/hashPassword";


export async function POST(req: NextRequest, {params}: {params: {userId: string}}) {
    
        await dbConnect();
    
        try {
    
            const userId = params.userId;
    
            const user = await UserModel.findOne(
                {
                    username: userId
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
    
            const { oldPassword, newPassword } = await req.json()
    
            if(!oldPassword || !newPassword){
                return NextResponse.json(
                    {
                        success: false,
                        message: "Both old and new password are required!!"
                    },
                    {
                        status: 400
                    }
                )
            }

            const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

            if(!isPasswordMatch){
                return NextResponse.json(
                    {
                        success: false,
                        message: "Old password is incorrect!!"
                    },
                    {
                        status: 400
                    }
                )
            }

            if(oldPassword === newPassword){
                return NextResponse.json(
                    {
                        success: false,
                        message: "Old and new password cannot be same!!"
                    },
                    {
                        status: 400
                    }
                )
            }

            const hashedPassword = await hashPassword(newPassword);

            if(!hashedPassword){
                return NextResponse.json(
                    {
                        success: false,
                        message: "Error hashing password!!"
                    },
                    {
                        status: 500
                    }
                )
            }

            user.password = hashedPassword;

            const updatedUser = await user.save();
    
            return NextResponse.json(
                {
                    success: true,
                    message: "Password updated successfully!!",
                }
            )
    
        } catch (error: any) {
            return NextResponse.json(
                {
                    success: false,
                    message: error.message
                },
                {
                    status: 500
                }
            )
        }
}