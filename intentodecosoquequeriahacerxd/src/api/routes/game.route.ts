import { Router } from 'express';
import {
    getGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame
} from "../controllers/gamecontroller";

const router = Router();
router.get("/", getGames);
router.get("/:id", getGameById);
router.post("/", createGame);
router.put("/:id", updateGame);
router.delete("/:id", deleteGame);

export default router;
// The game.route.ts file defines the routes for the game resource. It imports the Router class from the express module and the controller functions from the game.controller.ts file. It creates a new router instance and defines the following routes: