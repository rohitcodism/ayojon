import { NextRequest, NextResponse } from "next/server";
import eventModel from "@/models/event.model";
import dbConnect from "@/lib/dbConnect";

// Function to retrieve event details
async function viewEvent(req: NextRequest, { params }: { params: { eventId: string } }) {
    await dbConnect();

    try {
        const { eventId } = params;

        if (!eventId) {
            return NextResponse.json(
                { message: "Event ID is required" },
                { status: 400 }
            );
        }

        const event = await eventModel.findById(eventId);

        if (!event) {
            return NextResponse.json(
                { message: "Event not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(event, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}


export async function GET(req: NextRequest, context: { params: { eventId: string } }) {
    return viewEvent(req, context);
}


export async function handler(req: NextRequest, context: { params: { eventId: string } }) {
    if (req.method === "GET") {
        return GET(req, context);
    } else {
        return NextResponse.json(
            { message: `Method ${req.method} Not Allowed` },
            { status: 405 }
        );
    }
}
