"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// The server.ts file is the entry point of the application. It imports the connectDB function from the database.ts file and the movieRoutes from the movie.routes.ts file. It creates an Express app, sets up the middleware to parse JSON requests, and mounts the movieRoutes under the /api/movies path. Finally, it starts the server listening on the specified port.
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./database/database"));
const game_route_1 = __importDefault(require("./api/routes/game.route"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use("/api/games", game_route_1.default);
(0, database_1.default)().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
});
