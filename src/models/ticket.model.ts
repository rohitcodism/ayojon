import mongoose, { Schema, SchemaTypes, Document } from "mongoose";
import { Event } from "./event.model";
import { User } from "./user.model";

export interface Ticket extends Document { 
    event: Event,
    type: String,
    price: Number,
    quantity: Number,
    buyer: User,
}

const ticketSchema : Schema<Ticket> = new Schema({
    event: {
        type: SchemaTypes.ObjectId,
        ref: "Event",
        required: true
    },
    type: [], // Yet to be decided,
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    buyer: {
        type: SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    }
});

const ticketModel = (mongoose.models.Ticket as mongoose.Model<Ticket>) || (mongoose.model<Ticket>("Ticket", ticketSchema));