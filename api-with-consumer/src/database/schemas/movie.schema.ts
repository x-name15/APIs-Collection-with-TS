import { Schema } from "mongoose";

const MovieSchema = new Schema({
    title: { type: String, required: true },
    director: { type: String, required: true },
    year: { type: Number, required: true },
    genres: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
});

export default MovieSchema;
