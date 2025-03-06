import { Request, Response } from "express";
import Movie from "../structures/movie.model";

export const getMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las películas" });
  }
};

export const getMovieById = async (req: Request, res: Response): Promise<void> => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      res.status(404).json({ message: "Película no encontrada" });
      return;
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la película" });
  }
};

export const createMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Datos recibidos:", req.body); // 🔍 Verifica lo que llega
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    console.error("Error al crear la película:", error); // 🔍 Ver errores en la consola
    res.status(500).json({ message: "Error al crear la película" });
  }
};


export const updateMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMovie) {
      res.status(404).json({ message: "Película no encontrada" });
      return;
    }
    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la película" });
  }
};

export const deleteMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) {
      res.status(404).json({ message: "Película no encontrada" });
      return;
    }
    res.json({ message: "Película eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la película" });
  }
};
