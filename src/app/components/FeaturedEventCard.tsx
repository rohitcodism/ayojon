import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";

interface EventCardProps {
    title: string;
    image: StaticImageData;
    date: string;
}

export const FeaturedEventCard = ({ title, image, date }: EventCardProps) => {
    return (
        <div className="w-[280px] h-[230px] rounded-[15px] shadow-lg transition-transform transform hover:scale-105">
            <Card className="h-full rounded-[15px] bg-gradient-to-r from-purple-400 via-blue-500 to-purple-600 dark:from-purple-600 dark:via-blue-700 dark:to-purple-800">
                <CardContent className="p-0">
                    <Image
                        src={image}
                        alt="event-image"
                        className="w-full h-[160px] object-cover rounded-t-[15px]"
                    />
                </CardContent>
                <CardFooter className="flex flex-col p-4 bg-white dark:bg-gray-800 rounded-b-[15px] justify-center items-start">
                    <h1 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                        {title}
                    </h1>
                    <p className="text-md text-sm font-medium text-gray-400">
                        {date}
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};
