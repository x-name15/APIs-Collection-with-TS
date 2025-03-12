"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gamecontroller_1 = require("../controllers/gamecontroller");
const router = (0, express_1.Router)();
router.get("/", gamecontroller_1.getGames);
router.get("/:id", gamecontroller_1.getGameById);
router.post("/", gamecontroller_1.createGame);
router.put("/:id", gamecontroller_1.updateGame);
router.delete("/:id", gamecontroller_1.deleteGame);
exports.default = router;
// The game.route.ts file defines the routes for the game resource. It imports the Router class from the express module and the controller functions from the game.controller.ts file. It creates a new router instance and defines the following routes:
