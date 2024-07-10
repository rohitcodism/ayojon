import dbConnect from "@/lib/dbConnect";
import eventModel from "@/models/event.model";
import { NextRequest, NextResponse } from "next/server";


async function listEvents(req: NextRequest) {
    await dbConnect();

    try {
        const { searchParams } = new URL(req.url);
        const date = searchParams.get('date');
        const location = searchParams.get('location');

        const query: any = {};

        if (date) {
            query.date = new Date(date);
        }

        if (location) {
            query.location = location;
        }

        const events = await eventModel.find(query);

        return NextResponse.json(events, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}


export async function GET(req: NextRequest) {
    return listEvents(req);
}

export async function handler(req: NextRequest, context: { params: { eventId: string } }) {
    if (req.method === "GET") {
        return GET(req);
    } else {
        return NextResponse.json(
            { message: `Method ${req.method} Not Allowed` },
            { status: 405 }
        );
    }
}