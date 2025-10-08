// consumer/types.ts

import { IGenre } from "../../src/structures/interfaces/genre.interface";

export interface IMovie {
    _id: string;
    title: string;
    director: string;
    year: number;
    genres: IGenre[];
}

export interface MovieApiResponse {
    _embedded: {
        movies: IMovie[];
    };
    _links: {
        next?: { href: string };
    };
}
