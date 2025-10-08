import { Request, Response } from "express";
import { Types } from "mongoose";
import halson from "halson";
import MovieEntity from "../../structures/classes/movie.entity";
import Movie from "../../database/models/movie.model";
import Genre from "../../database/models/genre.model";

// Obtener todas las películas con sus géneros
export const getMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 5, director, year, genre } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const query: any = {};
    if (director) query.director = director;
    if (year) query.year = parseInt(year as string);
    if (genre) query.genre = { $elemMatch: { name: genre } };

    const total = await Movie.countDocuments();
    const movies = await Movie.find()
        .populate("genres", "name")
        .skip(skip)
        .limit(limitNum);

    const moviesAsHal = movies.map(movie =>
      halson({
        _id: movie._id,
        title: movie.title,
        director: movie.director,
        year: movie.year,
        genres: movie.genres,
      }).addLink('self', `/api/movies/${movie._id}`)
    );
    const totalPages = Math.ceil(total / limitNum);

    const baseLink = `/api/movies?${director ? `director=${director}&` : ""}${
        year ? `year=${year}&` : ""
    }${genre ? `genre=${genre}&` : ""}`;

    const response = halson({
        page,
        limit,
        total,
        totalPages,
    })
        .addLink("self", `/api/movies?page=${page}&limit=${limit}`)
        .addLink("first", `/api/movies?page=1&limit=${limit}`)
        .addLink("last", `/api/movies?page=${totalPages}&limit=${limit}`);

    if (pageNum > 1) response.addLink("prev", `${baseLink}page=${pageNum - 1}&limit=${limitNum}`);
    if (pageNum < totalPages)
      response.addLink("next", `${baseLink}page=${pageNum + 1}&limit=${limitNum}`);

    response.addEmbed("movies", moviesAsHal);

    res.json(response);
  } catch (error: any) {
    console.error("Error al obtener las películas:", error);
    res.status(500).json({ message: "Error al obtener las películas", error: error.message });
  }
};


// Obtener una película por ID con sus géneros
export const getMovieById = async (req: Request, res: Response): Promise<void> => {
  try {
    const movie = await Movie.findById(req.params.id).populate("genres", "name");
    if (!movie) {
      res.status(404).json({ message: "Película no encontrada" });
      return;
    }
    const movieResource = halson({
      _id: movie._id,
      title: movie.title,
      director: movie.director,
      year: movie.year,
      genres: movie.genres,
    })
        .addLink('self', `/api/movies/${movie._id}`)
        .addLink('collection', '/api/movies')
        .addLink("update", `/api/movies/${movie._id}`)
        .addLink("delete", `/api/movies/${movie._id}`);

    res.json(movieResource);
  } catch (error: any) {
    console.error("Error al obtener la película:", error);
    res.status(500).json({ message: "Error al obtener la película", error: error.message });
  }
};

// Crear una película con sus géneros
export const createMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, director, year, genres } = req.body;

    if (!genres || genres.length === 0) {
      res.status(400).json({ message: "Se requiere al menos un género" });
      return;
    }

    // Usamos MovieEntity para manejar la creación
    const entity = await MovieEntity.fromPayload({ title, director, year, genres });
    const movie = await entity.create();

    const movieResource = halson({
      _id: movie._id,
      title: movie.title,
      director: movie.director,
      year: movie.year,
      genres: movie.genres,
    })
      .addLink('self', `/api/movies/${movie._id}`)
      .addLink('collection', '/api/movies');

    res.status(201).json({ message: "Película creada con éxito", movie: movieResource });
  } catch (error: any) {
    console.error("Error al crear la película:", error);
    res.status(500).json({ message: "Error al crear la película", error: error.message });
  }
};

// Actualizar una película y sus géneros
export const updateMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, director, year, genres } = req.body;

    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      res.status(404).json({ message: "Película no encontrada" });
      return;
    }

    let genreIds: Types.ObjectId[] = [];
    if (genres && genres.length > 0) {
      for (const gName of genres) {
        let genre = await Genre.findOne({ name: gName });
        if (!genre) {
          genre = new Genre({ name: gName });
          await genre.save();
        }
        genreIds.push(genre._id as Types.ObjectId);
      }
    }

    movie.title = title ?? movie.title;
    movie.director = director ?? movie.director;
    movie.year = year ?? movie.year;
    if (genreIds.length > 0) movie.genres = genreIds;

    await movie.save();
    const updatedMovie = await movie.populate("genres", "name");

    const movieResource = halson({
      _id: updatedMovie._id,
      title: updatedMovie.title,
      director: updatedMovie.director,
      year: updatedMovie.year,
      genres: updatedMovie.genres,
    })
        .addLink('self', `/api/movies/${updatedMovie._id}`)
        .addLink('collection', '/api/movies')
        .addLink("update", `/api/movies/${updatedMovie._id}`)
        .addLink("delete", `/api/movies/${updatedMovie._id}`);

    res.json({ message: "Película actualizada", movie: movieResource });
  } catch (error: any) {
    console.error("Error al actualizar la película:", error);
    res.status(500).json({ message: "Error al actualizar la película", error: error.message });
  }
};


// Eliminar una película
export const deleteMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) {
      res.status(404).json(
          halson({ message: "Película no encontrada" })
              .addLink('collection', '/api/movies')
      );
      return;
    }

    res.status(200).json(
        halson({ message: "Película eliminada" })
            .addLink('collection', '/api/movies')
    );
  } catch (error: any) {
    console.error("Error al eliminar la película:", error);
    res.status(500).json(
        halson({ message: "Error al eliminar la película", error: error.message })
            .addLink('collection', '/api/movies')
    );
  }
};

