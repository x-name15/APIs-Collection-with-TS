import { Schema } from 'mongoose';
const publisherSchema = new Schema({
    name: { type: Schema.Types.Number, required: true }
})

export default publisherSchema;