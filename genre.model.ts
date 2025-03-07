import mongoose, { Schema, Document } from "mongoose";

interface IGenre extends Document {
    genre: string; // Solo permitir string
}

const GenreSchema = new Schema({
    genre: { type: String, required: true } // Solo permitir string
});

export default mongoose.model<IGenre>("Genre", GenreSchema);
