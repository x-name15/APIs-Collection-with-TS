import { Schema } from "mongoose";

const publisherSchema = new Schema({
    name: {type: String, required: true}
})

export default publisherSchema;
// The publisher.schema.ts file defines the schema for the publisher resource. It imports the Schema class from the mongoose module and creates a new schema instance for the publisher resource. The schema defines the following fields: