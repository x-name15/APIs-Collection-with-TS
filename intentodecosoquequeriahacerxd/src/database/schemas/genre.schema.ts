import { Schema } from "mongoose";

const genreSchema = new Schema ({
    name: {type: String, required: true}
})

export default genreSchema;