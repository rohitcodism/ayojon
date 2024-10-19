import mongoose, { Schema, Document, SchemaType, SchemaTypes } from "mongoose";
import { User } from "./user.model";

export interface Event extends Document {
    title: string,
    description: string,
    date: Date,
    category: string,
    location: string,
    capacity: number,
    createdBy: User,
    organizers: User[],
    speakers: User[]
}

const eventSchema: Schema<Event> = new Schema({
    title: {
        type: String,
        required: [true, "Title was required!!"],
    },
    description: {
        type: String,
        minlength: 100,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now() + (3600000 * 24),
        required: true
    },
    location: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: [true, "Event capacity must be at least 10!!"],
        default: 10
    },
    organizers: [
        {
            type: SchemaTypes.ObjectId,
            ref: "User"
        }
    ],
    speakers: [
        {
            type: SchemaTypes.ObjectId,
            ref: "User"
        }
    ],
    createdBy: {
        type: SchemaTypes.ObjectId,
        ref: "User",
        required: true
    }
},
    {
        timestamps: true
    }
)

const eventModel = ( mongoose.models.Event as mongoose.Model<Event>) || (mongoose.model<Event>("Event", eventSchema));

export default eventModel;