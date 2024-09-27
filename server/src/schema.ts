import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    _id : String,
    data: Object,
    created_at: { type: Date, default: Date.now },
}, { timestamps: true })

export const Document = mongoose.model("Document",documentSchema)
