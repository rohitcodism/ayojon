import { StaticImageData } from "next/image";
import { musicEventImage, standUpImage, techEventImage, yogaImage } from "../public/assets";


const eventTypes = [
    {
        id: 1,
        title: "Music & Festivals",
        image: musicEventImage,
        category: "Music"
    },
    {
        id: 2,
        title: "Tech & Business",
        image: techEventImage,
        category: "Technology"
    },
    {
        id: 3,
        title: "Comedy & Theaters",
        image: standUpImage,
        category: "Comedy"
    },
    {
        id: 4,
        title: "Health & Wellness",
        image: yogaImage,
        category: "Art & Culture"
    }
]

export interface FeaturedEvent {
    name: string;
    image: StaticImageData;
    date: string; // Using ISO 8601 format for date
    category: string;
}

const featuredEvents: FeaturedEvent[] = [
    {
        name: "Tech Conference 2024",
        image: techEventImage,
        date: "15 August",
        category: "Technology"
    },
    {
        name: "Summer Music Festival",
        image: musicEventImage,
        date: "22 July",
        category: "Music"
    },
    {
        name: "Stand-Up Comedy Night",
        image: standUpImage,
        date: "5 September",
        category: "Comedy"
    },
    {
        name: "Yoga Day Celebration",
        image: yogaImage,
        date: "10 October",
        category: "Art & Culture"
    }
]

const eventCategories: string[] = [
    "All",
    "Music",
    "Sports",
    "Comedy",
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