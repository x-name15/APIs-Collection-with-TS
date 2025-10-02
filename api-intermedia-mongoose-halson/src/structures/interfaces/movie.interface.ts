import { Types } from "mongoose";
import { IGenre } from "./genre.interface";

export interface IMovie {
  title: string;
  director: string;
  year: number;
  genres: Types.ObjectId[] | IGenre[];
}
