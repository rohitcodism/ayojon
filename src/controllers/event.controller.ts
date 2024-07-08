import eventModel from "@/models/event.model";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export const createEvent = async (req: NextRequest) => {
    const body = await req.json();
    const { title, description, date, location, organizers, capacity, speakers } = body;

    await dbConnect();

    try {
        const newEvent = new eventModel({
            title,
            description,
            date,
            location,
            organizers,
            capacity,
            speakers
        });

        const savedEvent = await newEvent.save();

        return NextResponse.json(savedEvent, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};
