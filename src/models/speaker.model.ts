import mongoose, { Schema, SchemaTypes } from "mongoose";
import { Event } from "./event.model";
import { User } from "./user.model";



export interface Speaker extends Document {
    addedBy: User,
    event: Event
}

const speakerSchema: Schema<Speaker> = new Schema({
    addedBy: {
        type: SchemaTypes.ObjectId,
        ref: "User"
    },
    event: {
        type: SchemaTypes.ObjectId,
        ref: "Event"
    }
})

const SpeakerModel = ( mongoose.models.Speaker as mongoose.Model<Speaker> ) || ( mongoose.model<Speaker>("Speaker", speakerSchema))

export default SpeakerModel;