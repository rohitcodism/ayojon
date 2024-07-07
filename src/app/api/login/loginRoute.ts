import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    await dbConnect();

    try {
        const { email, password } = await req.json();

        const user = await UserModel.findOne({email});
        if(!user){
            return NextResponse.json(
                { success: false, message: 'Invalid email or password' },
                { status: 401 }
              );
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json(
              { success: false, message: 'Invalid email or password' },
              { status: 401 }
            );
          }

        return NextResponse.json(
            { success: true },
            { status: 200 }
        );
      
        
    } catch (error) {
        return NextResponse.json(
            {success: false, message: error},
            {status: 500}
        )
    }

}