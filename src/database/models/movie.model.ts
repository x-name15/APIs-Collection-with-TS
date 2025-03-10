import mongoose, { Schema, Document } from "mongoose";

interface IMovie extends Document {
    title: string;
    director: string;
    year: number;
    genres: mongoose.Types.ObjectId[]; // Arreglo de ObjectId que referencia a los géneros
}

const MovieSchema = new Schema({
    title: { type: String, required: true },
    director: { type: String, required: true },
    year: { type: Number, required: true },
    genres: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }] // Referencia a los géneros
});

export default mongoose.model<IMovie>("Movie", MovieSchema);