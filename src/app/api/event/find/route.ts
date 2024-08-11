import dbConnect from "@/lib/dbConnect";
import eventModel from "@/models/event.model";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {
    await dbConnect();

    try {

        const url = new URL(req.url)

        const query = url.searchParams.get('query')


        if (typeof query === 'string') {
            const result = await eventModel.find({
                $or: [
                    {
                        title: { $regex: query, $options: 'i' }
                    }
                ]
            })

            const resultFinal = result.map((res) => {
                return {title: res.title, date: res.date}
            })
            

            return NextResponse.json(
                {
                    success: true,
                    data: resultFinal
                },
                {
                    status: 200
                }
            )
        }
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                message: error.message
            },
            {
                status: 500
            }
        )
    }
}