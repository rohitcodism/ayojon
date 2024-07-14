import { NextRequest, NextResponse } from "next/server";
import eventModel from "@/models/event.model";
import dbConnect from "@/lib/dbConnect";

// Function to update event capacity
async function updateEventCapacity(req: NextRequest, { params }: { params: { eventId: string } }) {
    await dbConnect();

    try {
        const body = await req.json();
        const { capacity } = body;
        const { eventId } = params;

        if (!capacity || typeof capacity !== 'number') {
            return NextResponse.json(
                { message: "Capacity is required and must be a number" },
                { status: 400 }
            );
        }

        if (capacity < 10) {
            return NextResponse.json(
                { message: "Event capacity must be at least 10" },
                { status: 400 }
            );
        }

        const updatedEvent = await eventModel.findByIdAndUpdate(
            eventId,
            { capacity },
            { new: true }
        );

        if (!updatedEvent) {
            return NextResponse.json(
                { message: "Event not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ capacity: updatedEvent.capacity }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// Export the PUT method for the route
export async function PUT(req: NextRequest, context: { params: { eventId: string } }) {
    return updateEventCapacity(req, context);
}

// Export a handler to manage HTTP methods
export async function handler(req: NextRequest, context: { params: { eventId: string } }) {
    if (req.method === "PUT") {
        return PUT(req, context);
    } else {
        return NextResponse.json(
            { message: `Method ${req.method} Not Allowed` },
            { status: 405 }
        );
    }
}
