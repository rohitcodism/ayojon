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

        console.log(`Identifier: ${queryParam.identifier}`)

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

        console.log(`Existing Users ${existingUser}`)

        return NextResponse.json(
            {
                success: true,
                data: existingUser.map((user) => {
                    return {
                        username: user.username,
                        profilePicture: user.profilePicture
                    }
                })
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