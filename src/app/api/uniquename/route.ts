import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { usernameValidation } from "../../../../schemas/userValidation.schema"
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(req: NextRequest){
    await dbConnect();

    try {
        
        const { searchParams } = new URL(req.url);

        const queryParam = {
            username: searchParams.get('username'),
        }

        const result = UsernameQuerySchema.safeParse(queryParam)

        console.log("Zod result : ",result.error?.issues[0]);

        if(!result.success){
            if(result.error.issues[0].code === "too_small" || result.error.issues[0].code === "too_big"){

                const errorCode = result.error.issues[0].code;

                return NextResponse.json(
                    {
                        success: false,
                        message: `Username should contain ${errorCode === "too_small" ? "minimum 5 letters!!" : "maximum 12 letters!!"}` 
                    }
                )
            } else {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Username cannot contain special characters or CAPITAL Letters!!"
                    },
                    {
                        status: 400
                    }
                )
            }
        }

        const exisitingUsernamedUser = await UserModel.findOne(
            {
                username: queryParam?.username,
                isVerified: true,
            }
        )

        if(exisitingUsernamedUser){
            return NextResponse.json(
                {
                    success: false,
                    message: "Verified user exists with this username!!"
                },
                {
                    status: 400
                }
            )
        }

        return NextResponse.json(
            {
                sucess: true,
                Message: "Username is available!!"
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