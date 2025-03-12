import {model, Document} from "mongoose";
import genreSchema from "../schemas/genre.schema";
import { IGenre } from "../../structures/interfaces/genre.interface";

interface IGenreDocument extends IGenre, Document {}
const genre = model<IGenreDocument>("Genre", genreSchema);
export default genre;