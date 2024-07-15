import { NextRequest, NextResponse } from "next/server";
import bookingModel from "@/models/booking.model";
import eventModel from "@/models/event.model";
import dbConnect from "@/lib/dbConnect";

// Function to create a booking
async function createBooking(req: NextRequest) {
    await dbConnect();

    try {
        const body = await req.json();
        const { userId, eventId, tickets } = body;

        
        if (!userId || !eventId || !tickets || typeof tickets !== 'number') {
            return NextResponse.json(
                { message: "All fields are required and tickets must be a number" },
                { status: 400 }
            );
        }

        // Check event capacity
        const event = await eventModel.findById(eventId);
        if (!event) {
            return NextResponse.json(
                { message: "Event not found" },
                { status: 404 }
            );
        }

        if (event.capacity < tickets) {
            return NextResponse.json(
                { message: `Only ${event.capacity} tickets are available` },
                { status: 400 }
            );
        }

        
        const newBooking = new bookingModel({
            userId,
            eventId,
            tickets
        });

        const savedBooking = await newBooking.save();

        // Update event capacity
        event.capacity -= tickets;
        await event.save();

        return NextResponse.json(savedBooking, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}


export async function POST(req: NextRequest) {
    return createBooking(req);
}


export async function handler(req: NextRequest) {
    if (req.method === "POST") {
        return POST(req);
    } else {
        return NextResponse.json(
            { message: `Method ${req.method} Not Allowed` },
            { status: 405 }
        );
    }
}
