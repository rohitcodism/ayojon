
import { createEvent } from "@/controllers/event.controller";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export default async function handler(req: NextRequest) {
    if (req.method === "POST") {
        await createEvent(req);
    } else {
        return NextResponse.json({ message: `Method ${req.method} Not Allowed` }, { status: 405 });
    }
}
