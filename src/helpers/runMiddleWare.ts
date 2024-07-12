import { NextRequest, NextResponse } from "next/server";

const runMiddleware = (req: NextRequest, res: NextResponse, fn: any) => {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                console.log("Error in multer upload!!")
                return reject(result);
            }
            console.log("File uploaded successfully!!");
            return resolve(result);
        });
    });
};

export default runMiddleware;