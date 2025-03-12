"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const gameSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    genre: { type: [mongoose_1.Schema.Types.ObjectId], ref: "genre", required: true },
    developer: { type: mongoose_1.Schema.Types.ObjectId, ref: "developer", required: true },
    publisher: { type: mongoose_1.Schema.Types.ObjectId, ref: "publisher", required: true },
    platform: { type: mongoose_1.Schema.Types.ObjectId, ref: "platform", required: true }
});
exports.default = gameSchema;
