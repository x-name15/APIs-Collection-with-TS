import { Schema } from "mongoose";

const GenreSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

export default GenreSchema;
