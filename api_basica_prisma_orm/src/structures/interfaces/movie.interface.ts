import { Genre } from './genre.interface.js';

export interface Movie {
  id: string;
  title: string;
  director: string;
  year: number;
  genres: Genre[]; // Tipamos los géneros "populados" que vamos a devolver
}