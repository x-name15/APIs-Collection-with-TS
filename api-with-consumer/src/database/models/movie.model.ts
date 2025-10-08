import { model, Document } from "mongoose";
import MovieSchema from "../schemas/movie.schema";
import { IMovie } from "../../structures/interfaces/movie.interface";

interface IMovieDocument extends IMovie, Document {}

const Movie = model<IMovieDocument>("Movie", MovieSchema);

export default Movie;
