import { Types } from "mongoose";
import Movie from "../../database/models/movie.model";
import Genre from "../../database/models/genre.model";
import { IMovie } from "../interfaces/movie.interface";

export default class MovieEntity {
    title: string;
    director: string;
    year: number;
    genres: Types.ObjectId[];

    constructor(data: IMovie) {
        this.title = data.title;
        this.director = data.director;
        this.year = data.year;
        this.genres = data.genres.map(g => g as Types.ObjectId); // fuerza ObjectId aquí
    }

    async create() {
        const movieDoc = new Movie({
            title: this.title,
            director: this.director,
            year: this.year,
            genres: this.genres,
        });

        await movieDoc.save();
        return movieDoc;
    }

    static async fromPayload(payload: {
        title: string;
        director: string;
        year: number;
        genres: string[];
    }): Promise<MovieEntity> {
        const genreIds: Types.ObjectId[] = [];

        for (const gName of payload.genres) {
            let genre = await Genre.findOne({ name: gName });
            if (!genre) {
                genre = new Genre({ name: gName });
                await genre.save();
            }
            genreIds.push(genre._id as Types.ObjectId);
        }

        const entity = new MovieEntity({
            title: payload.title,
            director: payload.director,
            year: payload.year,
            genres: genreIds,
        });

        return entity;
    }
}

