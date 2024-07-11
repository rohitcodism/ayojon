import dbConnect from "@/lib/dbConnect";
import eventModel from "@/models/event.model";
import { NextRequest, NextResponse } from "next/server";


export async function deleteEvent(req: NextRequest, params: { eventId: string }) {
    await dbConnect();
    
    try {
        const { eventId } = params;

        if (!eventId) {
            return NextResponse.json({ message: "Event ID is required" }, { status: 400 });
        }

        const deletedEvent = await eventModel.findByIdAndDelete(eventId);

        if (!deletedEvent) {
            console.error("Event not found for ID:", eventId);
            return NextResponse.json({ message: "Event not found" }, { status: 404 });
        }

        console.log("Event deleted successfully:", deletedEvent);
        return NextResponse.json({ message: "Event deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting event:", error);
        return NextResponse.json({ message: error }, { status: 500 });
    }    
}

export async function DELETE(req: NextRequest, context: { params: { eventId: string } }) {
    return deleteEvent(req, context.params);
}

export async function handler(req: NextRequest, context: { params: { eventId: string } }) {
    if (req.method === "DELETE") {
        return DELETE(req, context);
    } else {
        return NextResponse.json({ message: `Method ${req.method} Not Allowed` }, { status: 405 });
    }
}