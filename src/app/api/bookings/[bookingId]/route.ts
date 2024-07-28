import { NextRequest, NextResponse } from "next/server";
import bookingModel from "@/models/booking.model";
import dbConnect from "@/lib/dbConnect";

async function getBooking(req: NextRequest, { params }: { params: { bookingId: string } }) {
    await dbConnect();

    try {
        const { bookingId } = params;

        if (!bookingId) {
            return NextResponse.json({ message: "Booking ID is required" }, { status: 400 });
        }

        const booking = await bookingModel.findById(bookingId);
        if (!booking) {
            return NextResponse.json({ message: "Booking not found" }, { status: 404 });
        }

        return NextResponse.json(booking, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(req: NextRequest, context: { params: { bookingId: string } }) {
    return getBooking(req, context);
}

export async function handler(req: NextRequest, context: { params: { bookingId: string } }) {
    if (req.method === "GET") {
        return GET(req, context);
    } else {
        return NextResponse.json({ message: `Method ${req.method} Not Allowed` }, { status: 405 });
    }
}
