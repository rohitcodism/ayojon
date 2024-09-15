import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest){
    await dbConnect();

    try {
        
        const { searchParams } = new URL(req.url);

        const queryParam = {
            identifier: searchParams.get('identifier')
        }

        const existingUser = await UserModel.find({
            $or:[
                {username: { $regex:queryParam.identifier }},
                {email: { $regex: queryParam.identifier }}
            ]
        })

        if(!existingUser || existingUser.length === 0){
            return NextResponse.json(
                {
                    success: false,
                    data: "User not found."
                },
                {
                    status: 404
                }
            )
        }

        return NextResponse.json(
            {
                success: true,
                data: existingUser
            },
            {
                status: 200
            }
        )

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                success: false,
                data: error
            },
            {
                status: 500
            }
        )
    }
}