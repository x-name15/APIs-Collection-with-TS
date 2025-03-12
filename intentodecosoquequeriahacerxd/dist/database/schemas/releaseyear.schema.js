"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const publisherSchema = new mongoose_1.Schema({
    name: { type: String, required: true }
});
exports.default = publisherSchema;
