import { Router } from "express";
const router: Router = Router();
import { getMovies, getMovieById, createMovie, updateMovie, deleteMovie } from "../controllers/movie.controller";

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/", createMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

export default router;
