import { Schema } from "mongoose";

//el schema que estaba en models se ha movido aqui, esto es lo que recibira el json
const MovieSchema = new Schema({
    title: { type: String, required: true },
    director: { type: String, required: true },
    year: { type: Number, required: true },
    genres: [{ type: Schema.Types.ObjectId, ref: "Genre" }], // Referencia a la colección de géneros
});

export default MovieSchema;
