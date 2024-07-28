import { NextRequest, NextResponse } from "next/server";
import bookingModel from "@/models/booking.model";
import dbConnect from "@/lib/dbConnect";

async function getUserBookings(req: NextRequest) {
    await dbConnect();

    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }

        const bookings = await bookingModel.find({ userId });
        if (!bookings.length) {
            return NextResponse.json({ message: "No bookings found for this user" }, { status: 404 });
        }

        return NextResponse.json(bookings, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    return getUserBookings(req);
}

export async function handler(req: NextRequest) {
    if (req.method === "GET") {
        return GET(req);
    } else {
        return NextResponse.json({ message: `Method ${req.method} Not Allowed` }, { status: 405 });
    }
}
