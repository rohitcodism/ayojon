import { NextRequest, NextResponse } from "next/server";
import eventModel from "@/models/event.model";
import dbConnect from "@/lib/dbConnect";



async function updateEvent(req: NextRequest, { params }: { params: { eventId: string } }) {
    try {
        await dbConnect();
    } catch (error: any) {
        console.error("Database connection failed:", error);
        return NextResponse.json({ message: "Database connection failed: " + error.message }, { status: 500 });
    }

    try {
        const body = await req.json();
        const { title, description, date, location, capacity } = body;
        const  {eventId}  = params;
        console.log({eventId});
        

        if (!title || !description || !date || !location || !capacity) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

    
        if (description.length < 40) {
            return NextResponse.json(
                { message: "Description must be at least 40 characters long" },
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
            {
                title,
                description,
                date: new Date(date),
                location,
                capacity
            },
            { new: true }
        );

        if (!updatedEvent) {
            console.error("Event not found for ID:", eventId);
            return NextResponse.json(
                { message: "Event not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedEvent, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest, { params }: { params: { eventId: string } }) {
    return updateEvent(req, { params });
}

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
