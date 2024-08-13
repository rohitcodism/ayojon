import { NextRequest, NextResponse } from "next/server";
import { env } from "process";
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest){
    try{
        const order = await razorpay.orders.create({
            amount: 100*100,    //Amount in paise
            currency: "INR",
            receipt: "receipt_" + Math.random().toString(36).substring(7),
        });
        return NextResponse.json({ order: order.id }, { status: 200 });
    }
    catch(error){
        console.log("Error creating order: ", error);
        return NextResponse.json(
            { error: "Error creating Order" },
            { status: 500 }
        );
    }
}
