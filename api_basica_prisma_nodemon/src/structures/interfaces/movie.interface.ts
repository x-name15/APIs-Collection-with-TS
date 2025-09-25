import { Genre } from './genre.interface.js';

export interface Movie {
  id: string;
  title: string;
  director: string;
  year: number;
  genres: Genre[];
}