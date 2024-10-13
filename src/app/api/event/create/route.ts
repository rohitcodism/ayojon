import { NextRequest, NextResponse } from "next/server";
import eventModel from "@/models/event.model";
import dbConnect from "@/lib/dbConnect";
import Cloudinary from "@/lib/cloudinary";

async function createEvent(req: NextRequest) {
    await dbConnect();

    try {

        const formData = await req.formData();

        const eventName = formData.get("eventName") as string;
        const description = formData.get("description") as string;
        const date = formData.get("date") as string;
        const location = formData.get("location") as string;
        const price = formData.get("price") as string;
        const capacity = formData.get("capacity") as string;
        const category = formData.get("category") as string;
        const banner = formData.get("banner") as File | undefined;

        let bannerUrl = "";

        if((banner?.size !== 0) && (banner !== undefined) && (banner !== null)) {

            //TODO: Understand upload workflow

            const bytes = await banner.arrayBuffer();

            const buffer = Buffer.from(bytes);

            const result = await new Promise((resolve, reject) => {
                Cloudinary.uploader.upload_stream(
                    {
                        folder: "Ayojon/events",
                        resource_type: "image",
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        }

                        resolve(result);
                    }
                ).end(buffer);
            });

            bannerUrl = (result as any).secure_url;
        }


        if (!eventName || !description || !date || !location || !capacity || !category || !price) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        const priceN = Number(price)
        const capacityN = Number(capacity)


        if (description.length < 40) {
            return NextResponse.json(
                { message: "Description must be at least 40 characters long" },
                { status: 400 }
            );
        }


        if (capacityN < 10) {
            return NextResponse.json(
                { message: "Event capacity must be at least 10" },
                { status: 400 }
            );
        }

        const newEvent = new eventModel({
            title: eventName,
            description,
            category,
            date: new Date(date),
            location,
            price: priceN,
            capacity: capacityN,
            banner: bannerUrl ? bannerUrl : "",
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
