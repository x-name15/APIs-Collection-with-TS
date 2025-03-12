import { Schema } from "mongoose";
const platformSchema = new Schema({
    name: {type: String, required: true}
})

export default platformSchema;