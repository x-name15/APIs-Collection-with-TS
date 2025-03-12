import { Schema } from "mongoose";

const developerSchema = new Schema({
    name: {type: String, required: true},
})

export default developerSchema;