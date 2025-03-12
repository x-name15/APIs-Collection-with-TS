"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const publisherSchema = new mongoose_1.Schema({
    name: { type: String, required: true }
});
exports.default = publisherSchema;
// The publisher.schema.ts file defines the schema for the publisher resource. It imports the Schema class from the mongoose module and creates a new schema instance for the publisher resource. The schema defines the following fields:
