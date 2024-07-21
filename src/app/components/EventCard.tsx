import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";
import { musicEventImage } from "../../../public/assets";

interface EventCardProps {
    title: string;
    image: StaticImageData;
}

export const EventCard = ({ title, image }: EventCardProps) => {
    return (
        <div
            className="w-[280px] h-[230px] rounded-[15px] bg-white dark:bg-gray-800 shadow-lg transition-transform transform"
        >
            <Card className="h-full rounded-[15px]">
                <CardContent className="p-0">
                    <Image
                        src={image}
                        alt="event-image"
                        className="w-full h-[160px] object-cover rounded-t-[15px]"
                    />
                </CardContent>
                <CardFooter className="flex items-center justify-center p-4">
                    <h1
                        className="
                            text-lg
                            font-semibold
                            text-gray-900
                            dark:text-gray-100
                            text-center
                        "
                    >
                        {title}
                    </h1>
                </CardFooter>
            </Card>
        </div>
    );
};
