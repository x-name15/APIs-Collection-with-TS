import { Schema } from "mongoose";
import releaseYear from "../models/releaseyear.model";

const gameSchema = new Schema({
    title: {type: String, required: true},
    releaseYear: {type: Schema.Types.Number, required: true},
    genre: {type: [Schema.Types.ObjectId], ref: "Genre", required: true},
    developer: {type: Schema.Types.ObjectId, ref: "Developer", required: true},
    publisher: {type: Schema.Types.ObjectId, ref: "Publisher", required: true},
    platform: {type: [Schema.Types.ObjectId], ref: "Platform", required: true}
});

export default gameSchema;