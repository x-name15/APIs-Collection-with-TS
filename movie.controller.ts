import { Request, Response } from "express";
import Movie from "../structures/movie.model";
import Genre from "../structures/genre.model";

// Obtener todas las películas con sus géneros
export const getMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const movies = await Movie.find();
    const moviesWithGenres = await Promise.all(
      movies.map(async (movie) => {
        const genreEntry = await Genre.findOne({ movieId: movie._id });
        return { ...movie.toObject(), genres: genreEntry ? genreEntry.genres : [] };
      })
    );

    res.json(moviesWithGenres);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las películas" });
  }
};

// Obtener una película por ID con sus géneros
export const getMovieById = async (req: Request, res: Response): Promise<void> => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      res.status(404).json({ message: "Película no encontrada" });
      return;
    }

    const genreEntry = await Genre.findOne({ movieId: movie._id });
    res.json({ ...movie.toObject(), genres: genreEntry ? genreEntry.genres : [] });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la película" });
  }
};

// Crear una nueva película y sus géneros
export const createMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, director, year, genres } = req.body;

    if (!genres || !Array.isArray(genres) || genres.length === 0) {
      res.status(400).json({ message: "Se requiere al menos un género" });
      return;
    }

    // Crear película
    const newMovie = new Movie({ title, director, year });
    await newMovie.save();
    console.log("Película guardada:", newMovie);

    // Guardar géneros en la colección genres
    const newGenre = new Genre({ movieId: newMovie._id, genres });
    await newGenre.save();
    console.log("Géneros guardados:", newGenre);  // 👀 Ver si se guarda en MongoDB

    res.status(201).json({ message: "Película creada con éxito", movie: newMovie, genres: newGenre });
  } catch (error) {
    console.error("Error al crear la película:", error);
    res.status(500).json({ message: "Error al crear la película" });
  }
};


// Actualizar una película y sus géneros
export const updateMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, director, year, genres } = req.body;
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, { title, director, year }, { new: true });

    if (!updatedMovie) {
      res.status(404).json({ message: "Película no encontrada" });
      return;
    }

    if (genres && Array.isArray(genres)) {
      await Genre.findOneAndUpdate({ movieId: updatedMovie._id }, { genres }, { upsert: true });
    }

    res.json({ message: "Película actualizada", movie: updatedMovie, genres });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la película" });
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

    await Genre.findOneAndDelete({ movieId: deletedMovie._id });

    res.json({ message: "Película y géneros eliminados" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la película" });
  }
};
