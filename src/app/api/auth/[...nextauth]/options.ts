import { NextAuthOptions } from 'next-auth';
import  CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/user.model';

export const authOptions : NextAuthOptions = {
    providers : [
        CredentialsProvider({
            id : "credentials",
            name : "Credentials",
            credentials: {
                email: {
                    label : "Email",
                    type : "text",
                    placeholder : "xyz001@coolmail.com"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize(credentials: any) : Promise<any> {
                await dbConnect()

                try {
                    
                    const user = await UserModel.findOne({
                        $or: [
                            {email : credentials.identifier},
                            {password : credentials.identifier}
                        ]
                    })

                    if(!user){
                        throw new Error("No user found with this credentials!!");
                    }

                    if(!user.isVerified){
                        throw new Error("Please verify your account before login!!");
                    }

                    const isPasswordCorrect  = await bcrypt.compare(credentials.password, user.password);

                    if(!isPasswordCorrect){
                        throw new Error("Invalid Password!!");
                    }

                    return user;

                } catch (error: any) {
                    throw new Error(error);
                }
            }
        })
    ]
}