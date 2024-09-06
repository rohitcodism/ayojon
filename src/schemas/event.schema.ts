import { DefaultSession } from 'next-auth';
import { z } from 'zod'
import { eventCategories } from '../../constants'
import { userSchema } from './user.schema'

const allowedCategories = [    
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
    "Charity",
    "Others"
] as const

const defaultEventDate: Date = new Date(Date.now() + 24*3600000)

const eventSchema = z.object({
    eventName: z.string().min(5, "Event name must contain 5 letters.").max(20, "Event name can contain at max 20 letters."),
    description: z.string().min(10, "Event description must contain at least 10 words.").max(300, "Event description can at most contain 300 letters."), //TODO: Adjust it according to its need
    category: z.enum(allowedCategories),
    date: z.date().default(defaultEventDate),
    location: z.string(),
    capacity: z.number(),
    organizers: z.array(userSchema),
    speakers: z.array(userSchema)
})

export {
    defaultEventDate,
    eventSchema,
    allowedCategories
}