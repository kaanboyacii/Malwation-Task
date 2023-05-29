import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    date: {
        type: Date
    },
}, { timestamps: true });

export default mongoose.model("Event", EventSchema);