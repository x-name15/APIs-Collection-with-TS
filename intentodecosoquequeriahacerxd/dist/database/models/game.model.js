"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const game_schema_1 = __importDefault(require("../schemas/game.schema"));
const game = (0, mongoose_1.model)("Game", game_schema_1.default);
exports.default = game;
// The game.model.ts file defines the Mongoose model for the game resource. It imports the model and Document types from the mongoose module, the gameSchema from the game.schema.ts file, and the IGame interface from the game.interface.ts file. It defines an IGameDocument interface that extends the IGame interface and the Document interface from Mongoose. Finally, it exports the game model created with the model function from Mongoose, passing the IGameDocument interface and the gameSchema as arguments.
