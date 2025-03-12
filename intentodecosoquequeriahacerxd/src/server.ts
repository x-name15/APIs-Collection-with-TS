// The server.ts file is the entry point of the application. It imports the connectDB function from the database.ts file and the movieRoutes from the movie.routes.ts file. It creates an Express app, sets up the middleware to parse JSON requests, and mounts the movieRoutes under the /api/movies path. Finally, it starts the server listening on the specified port.
import express from "express"
import { connectDB } from "./database/database";
import gameRoute from "./api/routes/game.route";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/games",gameRoute);

connectDB().then(() => {
    app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
});
