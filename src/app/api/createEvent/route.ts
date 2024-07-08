import { createEvent } from "@/controllers/event.controller";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    return createEvent(req);
}

export async function handler(req: NextRequest) {
    if (req.method === "POST") {
        return createEvent(req);
    } else {
        return NextResponse.json({ message: `Method ${req.method} Not Allowed` }, { status: 405 });
    }
}
