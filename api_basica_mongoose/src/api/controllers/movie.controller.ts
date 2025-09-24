import { Request, Response } from "express";
import mongoose from "mongoose";
import Movie from "../../database/models/movie.model";
import Genre from "../../database/models/genre.model";

// Obtener todas las películas con sus géneros
export const getMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const movies = await Movie.find().populate('genres', 'genre');
    res.json(movies);
  } catch (error: any) {
    console.error("Error al obtener las películas:", error);
    res.status(500).json({ message: "Error al obtener las películas", error: error.message });
  }
};

// Obtener una película por ID con sus géneros
export const getMovieById = async (req: Request, res: Response): Promise<void> => {
  try {
    const movie = await Movie.findById(req.params.id).populate('genres', 'genre');
    if (!movie) {
      res.status(404).json({ message: "Película no encontrada" });
      return;
    }
    res.json(movie);
  } catch (error: any) {
    console.error("Error al obtener la película:", error);
    res.status(500).json({ message: "Error al obtener la película", error: error.message });
  }
};
// Crear una película con sus géneros
export const createMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, director, year, genres } = req.body;

    if (!genres || (Array.isArray(genres) && genres.length === 0)) {
      res.status(400).json({ message: "Se requiere al menos un género" });
      return;
    }

    // Verificamos si los géneros existen o los creamos
    const genreIds = await Promise.all(
      genres.map(async (genreName: string) => {
        let genre = await Genre.findOne({ name: genreName });
        if (!genre) {
          genre = new Genre({ name: genreName });
          await genre.save();
        }
        return genre._id;
      })
    );

    // Creamos la película con los IDs de los géneros
    const newMovie = new Movie({ title, director, year, genres: genreIds });
    await newMovie.save();
/*

*/
    res.status(201).json({ message: "Película creada con éxito", movie: newMovie });
  } catch (error) {
    console.error("Error al crear la película:", error);
    res.status(500).json({ message: "Error al crear la película" });
  }
};

// Actualizar una película y sus géneros
export const updateMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, director, year, genres } = req.body;
    // Convertir géneros a ObjectId
    const genreIds = await Promise.all(genres.map(async (genre: string) => {
      const genreDoc = await Genre.findOne({ genre });
      if (genreDoc) {
        return genreDoc._id;
      } else {
        const newGenre = new Genre({ genre });
        await newGenre.save();
        return newGenre._id;
      }
    }));

    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, { title, director, year, genres: genreIds }, { new: true });

    if (!updatedMovie) {
      res.status(404).json({ message: "Película no encontrada" });
      return;
    }

    res.json({ message: "Película actualizada", movie: updatedMovie });
  } catch (error: any) {
    console.error("Error al actualizar la película:", error);
    res.status(500).json({ message: "Error al actualizar la película", error: error.message });
  }
};

// Eliminar una película y sus géneros asociados
export const deleteMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) {
      res.status(404).json({ message: "Película no encontrada" });
      return;
    }

    res.json({ message: "Película eliminada" });
  } catch (error: any) {
    console.error("Error al eliminar la película:", error);
    res.status(500).json({ message: "Error al eliminar la película", error: error.message });
  }
};