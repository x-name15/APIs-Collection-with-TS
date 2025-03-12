"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGame = exports.updateGame = exports.createGame = exports.getGameById = exports.getGames = void 0;
const game_model_1 = __importDefault(require("../../database/models/game.model"));
const genre_model_1 = __importDefault(require("../../database/models/genre.model"));
const developer_model_1 = __importDefault(require("../../database/models/developer.model"));
const publisher_model_1 = __importDefault(require("../../database/models/publisher.model"));
const platform_model_1 = __importDefault(require("../../database/models/platform.model"));
// Obtener todos los videojuegos con sus relaciones
const getGames = async (req, res) => {
    try {
        const games = await game_model_1.default.find()
            .populate('genres', 'name')
            .populate('developer', 'name')
            .populate('publisher', 'name')
            .populate('platforms', 'name');
        res.json(games);
    }
    catch (error) {
        console.error("Error al obtener los videojuegos:", error);
        res.status(500).json({ message: "Error al obtener los videojuegos", error: error.message });
    }
};
exports.getGames = getGames;
// Obtener un videojuego por ID con sus relaciones
const getGameById = async (req, res) => {
    try {
        const game = await game_model_1.default.findById(req.params.id)
            .populate('genres', 'name')
            .populate('developer', 'name')
            .populate('publisher', 'name')
            .populate('platforms', 'name');
        if (!game) {
            res.status(404).json({ message: "Videojuego no encontrado" });
            return;
        }
        res.json(game);
    }
    catch (error) {
        console.error("Error al obtener el videojuego:", error);
        res.status(500).json({ message: "Error al obtener el videojuego", error: error.message });
    }
};
exports.getGameById = getGameById;
// Crear un videojuego con sus relaciones
const createGame = async (req, res) => {
    try {
        const { title, developer, publisher, releaseYear, genres, platforms } = req.body;
        if (!genres || genres.length === 0) {
            res.status(400).json({ message: "Se requiere al menos un género" });
            return;
        }
        // Verificamos y guardamos los géneros
        const genreIds = await Promise.all(genres.map(async (genreName) => {
            let genre = await genre_model_1.default.findOne({ name: genreName });
            if (!genre) {
                genre = new genre_model_1.default({ name: genreName });
                await genre.save();
            }
            return genre._id;
        }));
        // Verificamos y guardamos la desarrolladora
        let developerDoc = await developer_model_1.default.findOne({ name: developer });
        if (!developerDoc) {
            developerDoc = new developer_model_1.default({ name: developer });
            await developerDoc.save();
        }
        // Verificamos y guardamos la publicadora
        let publisherDoc = await publisher_model_1.default.findOne({ name: publisher });
        if (!publisherDoc) {
            publisherDoc = new publisher_model_1.default({ name: publisher });
            await publisherDoc.save();
        }
        // Verificamos y guardamos las plataformas
        const platformIds = await Promise.all(platforms.map(async (platformName) => {
            let platform = await platform_model_1.default.findOne({ name: platformName });
            if (!platform) {
                platform = new platform_model_1.default({ name: platformName });
                await platform.save();
            }
            return platform._id;
        }));
        // Creamos el videojuego con los IDs
        const newGame = new game_model_1.default({
            title,
            developer: developerDoc._id,
            publisher: publisherDoc._id,
            releaseYear,
            genres: genreIds,
            platforms: platformIds
        });
        await newGame.save();
        res.status(201).json({ message: "Videojuego creado con éxito", game: newGame });
    }
    catch (error) {
        console.error("Error al crear el videojuego:", error);
        res.status(500).json({ message: "Error al crear el videojuego" });
    }
};
exports.createGame = createGame;
// Actualizar un videojuego y sus relaciones
const updateGame = async (req, res) => {
    try {
        const { title, developer, publisher, releaseYear, genres, platforms } = req.body;
        const genreIds = await Promise.all(genres.map(async (genreName) => {
            let genre = await genre_model_1.default.findOne({ name: genreName });
            if (!genre) {
                genre = new genre_model_1.default({ name: genreName });
                await genre.save();
            }
            return genre._id;
        }));
        let developerDoc = await developer_model_1.default.findOne({ name: developer });
        if (!developerDoc) {
            developerDoc = new developer_model_1.default({ name: developer });
            await developerDoc.save();
        }
        let publisherDoc = await publisher_model_1.default.findOne({ name: publisher });
        if (!publisherDoc) {
            publisherDoc = new publisher_model_1.default({ name: publisher });
            await publisherDoc.save();
        }
        const platformIds = await Promise.all(platforms.map(async (platformName) => {
            let platform = await platform_model_1.default.findOne({ name: platformName });
            if (!platform) {
                platform = new platform_model_1.default({ name: platformName });
                await platform.save();
            }
            return platform._id;
        }));
        const updatedGame = await game_model_1.default.findByIdAndUpdate(req.params.id, {
            title,
            developer: developerDoc._id,
            publisher: publisherDoc._id,
            releaseYear,
            genres: genreIds,
            platforms: platformIds
        }, { new: true });
        if (!updatedGame) {
            res.status(404).json({ message: "Videojuego no encontrado" });
            return;
        }
        res.json({ message: "Videojuego actualizado", game: updatedGame });
    }
    catch (error) {
        console.error("Error al actualizar el videojuego:", error);
        res.status(500).json({ message: "Error al actualizar el videojuego", error: error.message });
    }
};
exports.updateGame = updateGame;
// Eliminar un videojuego
const deleteGame = async (req, res) => {
    try {
        const deletedGame = await game_model_1.default.findByIdAndDelete(req.params.id);
        if (!deletedGame) {
            res.status(404).json({ message: "Videojuego no encontrado" });
            return;
        }
        res.json({ message: "Videojuego eliminado" });
    }
    catch (error) {
        console.error("Error al eliminar el videojuego:", error);
        res.status(500).json({ message: "Error al eliminar el videojuego", error: error.message });
    }
};
exports.deleteGame = deleteGame;
