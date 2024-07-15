import mongoose, { Document, Schema } from "mongoose";

export interface TicketBooking extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    eventId: mongoose.Schema.Types.ObjectId;
    tickets: number;
    createdAt: Date;
    updatedAt: Date;
}

const bookingSchema: Schema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true,
        },
        tickets: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const bookingModel = mongoose.models.Booking || mongoose.model<TicketBooking>("Booking", bookingSchema);

export default bookingModel;
