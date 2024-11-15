import { generateOtp } from "@/helpers/generateOtp";
import { hashPassword } from "@/helpers/hashPassword";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import Cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";
import { IncomingMessage } from "http";


export async function POST(req: NextRequest, res: NextResponse) {

    await dbConnect();

    try {
        const formData = await req.formData()

        const username = formData.get('username') as string
        const fullname = formData.get('fullname') as string
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const profilePicture = formData.get('profilePicture') as File | undefined

        console.log(fullname)

        console.log(profilePicture);

        let profilePictureUrl = "";

        if ((profilePicture?.size !== 0) && (profilePicture !== undefined) && (profilePicture !== null)) {
            const bytes = await profilePicture.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const result = await new Promise((resolve, reject) => {
                Cloudinary.uploader.upload_stream(
                    {
                        folder: "Ayojon/user_profiles",
                        resource_type: "image",
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        }
                        resolve(result);
                    }
                ).end(buffer);
            })

            profilePictureUrl = (result as any).secure_url;
        }

        const existingUserWithVerifiedUsername = await UserModel.findOne({
            username,
            isVerified: true
        })

        if (existingUserWithVerifiedUsername) {
            return NextResponse.json(
                {
                    message: "Username taken!",
                    success: false
                },
                {
                    status: 400
                }
            )
        }

        const user = await UserModel.findOne({
            email
        })

        const otp = generateOtp();

        if (user && user?.isVerified) {
            return NextResponse.json(
                {
                    success: false,
                    message: "A user already exist with the verified email."
                },
                {
                    status: 500
                }
            )
        }

        else if (user && !user?.isVerified) {
            const hashedPassword = await hashPassword(password);

            user.password = hashedPassword;

            user.verifyCode = otp;

            user.verifyCodeExpiry = new Date(Date.now() + 3600000);

            await user.save();
        }

        else {

            const hashedPassword = await hashPassword(password);

            const expiryDate = new Date();

            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = await UserModel.create(
                {
                    username,
                    fullname,
                    email,
                    profilePicture: profilePictureUrl != "" ? profilePictureUrl : "",
                    password: hashedPassword,
                    verifyCode: otp,
                    verifyCodeExpiry: expiryDate,
                    isVerified: false
                }
            )

            await newUser.save();

        }

        const emailResponse = await sendVerificationEmail(
            email,
            username,
            otp
        );

        if (emailResponse.status >= 500) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Something went wrong while sending email to ${username}`
                },
                {
                    status: 500
                }
            )
        }

        return NextResponse.json(
            {
                success: true,
                message: "Verification email sent successfully!! Please verify your email address to login."
            },
            {
                status: 200
            }
        )
    } catch (error: any) {
        console.log("Sign up error: ", error)
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