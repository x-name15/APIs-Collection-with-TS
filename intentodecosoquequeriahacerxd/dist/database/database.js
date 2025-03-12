"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = async () => {
    try {
        const dbUri = process.env.MONGODB_URI;
        await mongoose_1.default.connect(dbUri);
        console.log("Conexión a la base de datos establecida");
    }
    catch (error) {
        console.error("Error al conectar a la base de datos", error);
        process.exit(1);
    }
};
exports.default = connectDB;
// The database.ts file contains the connectDB function that connects to the MongoDB database using the Mongoose library. It reads the MongoDB connection URI from the environment variable MONGODB_URI and establishes a connection to the database. If the connection is successful, it logs a message to the console. If an error occurs during the connection process, it logs an error message and exits the application with an exit code of 1.
