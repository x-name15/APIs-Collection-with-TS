import { Request, Response } from 'express';
import mongoose from "mongoose";
import Game from "../../database/models/game.model";
import Genre from "../../database/models/genre.model";
import Developer from "../../database/models/developer.model";
import Publisher from "../../database/models/publisher.model";
import Platform from "../../database/models/platform.model";

// Obtener todos los videojuegos con sus relaciones
export const getGames = async (req: Request, res: Response): Promise<void> => {
  try {
    const games = await Game.find()
      .populate('genres', 'name')
      .populate('developer', 'name')
      .populate('publisher', 'name')
      .populate('platforms', 'name');

    res.json(games);
  } catch (error: any) {
    console.error("Error al obtener los videojuegos:", error);
    res.status(500).json({ message: "Error al obtener los videojuegos", error: error.message });
  }
};

// Obtener un videojuego por ID con sus relaciones
export const getGameById = async (req: Request, res: Response): Promise<void> => {
  try {
    const game = await Game.findById(req.params.id)
      .populate('genres', 'name')
      .populate('developer', 'name')
      .populate('publisher', 'name')
      .populate('platforms', 'name');

    if (!game) {
      res.status(404).json({ message: "Videojuego no encontrado" });
      return;
    }
    res.json(game);
  } catch (error: any) {
    console.error("Error al obtener el videojuego:", error);
    res.status(500).json({ message: "Error al obtener el videojuego", error: error.message });
  }
};

// Crear un videojuego con sus relaciones
export const createGame = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, developer, publisher, releaseYear, genres, platforms } = req.body;

    if (!genres || genres.length === 0) {
      res.status(400).json({ message: "Se requiere al menos un género" });
      return;
    }

    // Verificamos y guardamos los géneros
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

    // Verificamos y guardamos la desarrolladora
    let developerDoc = await Developer.findOne({ name: developer });
    if (!developerDoc) {
      developerDoc = new Developer({ name: developer });
      await developerDoc.save();
    }

    // Verificamos y guardamos la publicadora
    let publisherDoc = await Publisher.findOne({ name: publisher });
    if (!publisherDoc) {
      publisherDoc = new Publisher({ name: publisher });
      await publisherDoc.save();
    }

    // Verificamos y guardamos las plataformas
    const platformsArray = Array.isArray(platforms) ? platforms : [platforms]; // Asegurarse de que sea un array
    
    const platformIds = await Promise.all(
      platformsArray.map(async (platformName: string) => {
        let platform = await Platform.findOne({ name: platformName });
        if (!platform) {
          platform = new Platform({ name: platformName });
          await platform.save();
        }
        return platform._id;
      })
    );

    // Creamos el videojuego con los IDs
    const newGame = new Game({
      title,
      developer: developerDoc._id,
      publisher: publisherDoc._id,
      releaseYear,
      genres: genreIds,
      platform: platformIds
    });

    const createdGame  = await newGame.save();

    console.log(createdGame);

    res.status(201).json({
      message: "Videojuego creado con éxito",
    });
  } catch (error: any) {
    console.error("Error al crear el videojuego:", error);
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json({ message: "Error de validación", error: error.message });
    } else {
      res.status(500).json({ message: "Error al crear el videojuego", error: error.message });
    }
  }
};

// Actualizar un videojuego y sus relaciones
export const updateGame = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, developer, publisher, releaseYear, genres, platforms } = req.body;

    // Verificamos y guardamos los géneros
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

    // Verificamos y guardamos la desarrolladora
    let developerDoc = await Developer.findOne({ name: developer });
    if (!developerDoc) {
      developerDoc = new Developer({ name: developer });
      await developerDoc.save();
    }

    // Verificamos y guardamos la publicadora
    let publisherDoc = await Publisher.findOne({ name: publisher });
    if (!publisherDoc) {
      publisherDoc = new Publisher({ name: publisher });
      await publisherDoc.save();
    }

    // Verificamos y guardamos las plataformas
    const platformsArray = Array.isArray(platforms) ? platforms : [platforms]; // Asegurarse de que sea un array
    const platformIds = await Promise.all(
      platformsArray.map(async (platformName: string) => {
        let platform = await Platform.findOne({ name: platformName });
        if (!platform) {
          platform = new Platform({ name: platformName });
          await platform.save();
        }
        return platform._id;
      })
    );

    // Actualizamos el videojuego
    const updatedGame = await Game.findByIdAndUpdate(
      req.params.id,
      {
        title,
        developer: developerDoc._id,
        publisher: publisherDoc._id,
        releaseYear,
        genres: genreIds,
        platforms: platformIds
      },
      { new: true }
    );

    if (!updatedGame) {
      res.status(404).json({ message: "Videojuego no encontrado" });
      return;
    }

    res.json({ message: "Videojuego actualizado", game: updatedGame });
  } catch (error: any) {
    console.error("Error al actualizar el videojuego:", error);
    res.status(500).json({ message: "Error al actualizar el videojuego", error: error.message });
  }
};

// Eliminar un videojuego
export const deleteGame = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedGame = await Game.findByIdAndDelete(req.params.id);
    if (!deletedGame) {
      res.status(404).json({ message: "Videojuego no encontrado" });
      return;
    }

    res.json({ message: "Videojuego eliminado" });
  } catch (error: any) {
    console.error("Error al eliminar el videojuego:", error);
    res.status(500).json({ message: "Error al eliminar el videojuego", error: error.message });
  }
};
