import mongoose, { Schema, SchemaTypes } from "mongoose";
import { Event } from "./event.model";
import { User } from "./user.model";



export interface Organizer extends Document {
    addedBy: User,
    event: Event
}

const organizerSchema: Schema<Organizer> =  new Schema({
    addedBy: {
        type: SchemaTypes.ObjectId,
        ref: "User"
    },
    event: {
        type: SchemaTypes.ObjectId,
        ref: "Event"
    }
})

const OrganizerModel = ( mongoose.models.Organizer as  mongoose.Model<Organizer> ) || ( mongoose.model<Organizer>("Organizer", organizerSchema) )

export default OrganizerModel;