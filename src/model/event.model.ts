import mongoose, { Schema, Document } from 'mongoose';

interface IEvent extends Document {
    eventName: string;
    eventDate: Date;
    organizer: string;
    email: string;
    phone: string;
    location: {
        street: string;
        city: string;
        state: string;
        zip: string;
    };
    createdAt: Date;
    updatedAt: Date;
}


const EventSchema: Schema = new Schema(
    {
        eventName: { type: String, required: true },
        eventDate: { type: Date, required: true },
        organizer: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        location: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zip: { type: String, required: true },
        },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const Event = mongoose.model<IEvent>('Event', EventSchema);

export default Event;
