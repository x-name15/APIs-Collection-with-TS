import { model, Document } from "mongoose";
import GenreSchema from "../schemas/genre.schema";
import { IGenre } from "../../structures/interfaces/genre.interface";

interface IGenreDocument extends IGenre, Document {}

const Genre = model<IGenreDocument>("Genre", GenreSchema);

export default Genre;