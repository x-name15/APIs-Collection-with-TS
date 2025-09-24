import { Router } from "express";
import {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
} from "../controllers/movie.controller";

const router = Router();

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/", createMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

export default router;
