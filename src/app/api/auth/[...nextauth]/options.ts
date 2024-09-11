import { NextAuthOptions } from 'next-auth';
import  CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/user.model';
import GoogleProvider from "next-auth/providers/google";

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

                console.log("Credentials: ",credentials)

                try {
                    
                    const user = await UserModel.findOne({
                        $or: [
                            {email : credentials.identifier},
                            {username : credentials.identifier}
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
                    console.log(error);
                    throw new Error(error);
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    callbacks: {
        async jwt({ token, user }){
            if(user){
                token._id = user._id?.toString();
                token.username = user.username;
            }
            return token;
        },
        async session({session, token}) {
            
            if(token){
                session.user._id = token._id;
                session.user.username = token.username;
                session.user.isVerified = token.isVerified;
            }

            return session;
        },
    },
    pages: {
        signIn: "signin"
    },
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET
}