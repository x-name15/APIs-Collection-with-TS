"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const releaseyear_schema_1 = __importDefault(require("../schemas/releaseyear.schema"));
const releaseYear = (0, mongoose_1.model)("ReleaseYear", releaseyear_schema_1.default);
exports.default = releaseYear;
// Compare this snippet from src/database/models/developer.model.ts:
