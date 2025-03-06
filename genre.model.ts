import mongoose, { Schema, Document } from "mongoose";

interface IGenre extends Document {
    movieId: mongoose.Types.ObjectId;
    genres: string[];
}

const GenreSchema = new Schema({
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
    genres: { type: [String], required: true },
});

export default mongoose.model<IGenre>("Genre", GenreSchema);
