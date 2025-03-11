import { Types } from "mongoose";
import { IGenre } from "./genre.interface";

//interfaces (dira que tiene cada cosa dentro del json)
export interface IMovie {
  title: string;
  director: string;
  year: number;
  genres: Types.ObjectId[] | IGenre[]; // IDs de los géneros o los objetos completos
}
