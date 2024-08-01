import { NextRequest, NextResponse } from "next/server";
import eventModel from "@/models/event.model";
import dbConnect from "@/lib/dbConnect";

async function createEvent(req: NextRequest) {
    await dbConnect();

    try {
        const body = await req.json();
        const { title, description, date, location, organizers, capacity, speakers, category } = body;


        if (!title || !description || !date || !location || !organizers || !capacity || !category) {
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

        const newEvent = new eventModel({
            title,
            description,
            category,
            date: new Date(date),
            location,
            organizers,
            capacity,
            speakers: speakers || []
        });

        const savedEvent = await newEvent.save();

        return NextResponse.json(savedEvent, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    return createEvent(req);
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
