import { Button } from "@/components/ui/button";



export const Community = () => {
    return (
        <div
            className="container flex flex-col gap-2"
        >
            <h1
                className="
                text-4xl
                font-bold
            "
            >
                Join a community of creators
            </h1>
            <p
                className="text-lg font-semifold"
            >
                Whether you are an artist, musician, chef or anyone in between, we empower creators to bring their ideas to life and<br />connect with their audience
            </p>
            <div
                className="py-4 w-[20%]"
            >
                <Button
                    className="rounded-full"
                >
                    Join us as a creator
                </Button>
            </div>
        </div>
    );
}