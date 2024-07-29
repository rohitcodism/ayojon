import { StaticImageData } from "next/image";
import { musicEventImage, standUpImage, techEventImage, yogaImage } from "../public/assets";


const eventTypes = [
    {
        id: 1,
        title: "Music & Festivals",
        image: musicEventImage
    },
    {
        id: 2,
        title: "Tech & Business",
        image: techEventImage
    },
    {
        id: 3,
        title: "Comedy & Theaters",
        image: standUpImage
    },
    {
        id: 4,
        title: "Health & Wellness",
        image: yogaImage
    }
]

interface FeaturedEvent {
    name: string;
    image: StaticImageData;
    date: string; // Using ISO 8601 format for date
}

const featuredEvents: FeaturedEvent[] = [
    {
        name: "Tech Conference 2024",
        image: techEventImage,
        date: "15 August"
    },
    {
        name: "Summer Music Festival",
        image: musicEventImage,
        date: "22 July"
    },
    {
        name: "Stand-Up Comedy Night",
        image: standUpImage,
        date: "5 September"
    },
    {
        name: "Yoga Day Celebration",
        image: yogaImage,
        date: "10 October"
    }
]

const eventCategories: string[] = [
    "Music",
    "Sports",
    "Technology",
    "Health",
    "Business",
    "Education",
    "Entertainment",
    "Food & Drink",
    "Art & Culture",
    "Networking",
    "Travel",
    "Fashion",
    "Literature",
    "Science",
    "Community",
    "Spirituality",
    "Workshop",
    "Conference",
    "Festival",
    "Charity"
];


export {
    eventTypes, featuredEvents, eventCategories
}