import { cloudinaryUploader } from "@/helpers/cloudinaryUploader";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { string, z } from "zod";



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

        const formData = await req.formData()

        const username = formData.get('username') as string | null

        const profilePicture = formData.get('profilePicture') as File | null

        console.log(`username: ${username}\nprofilePicture: ${profilePicture}\n`)

        if(!username && !profilePicture){
            return NextResponse.json(
                {
                    success: false,
                    message: "At least one details should be provided!!"
                },
                {
                    status: 400
                }
            )
        }

        const profilePictureUrl = profilePicture ? await cloudinaryUploader(profilePicture) : null

        console.log(" Updated Profile Picture Url: ", profilePictureUrl)

        if(profilePicture?.size && !profilePictureUrl){
            return NextResponse.json(
                {
                    success: false,
                    message: "Error uploading profile picture!!"
                },
                {
                    status: 500
                }
            )
        }

        if(username && (username !== user.username) && profilePicture?.size){
            user.username = username
            user.profilePicture = profilePictureUrl
        }
        else if((username && (username === user.username) && profilePicture?.size) || (!username && profilePicture?.size)){
            user.profilePicture = profilePictureUrl
        }
        else if(username && !profilePicture?.size){
            user.username = username
        }

        return NextResponse.json(
            {
                success: true,
                message: "User updated successfully!!"
            },
            {
                status: 200
            }
        )
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