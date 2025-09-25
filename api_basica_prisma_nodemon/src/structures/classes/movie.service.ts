import { MovieModel } from '../../database/models/movie.model';

export class MovieService {
    async getAll() {
        return MovieModel.getAll();
    }

    async getById(id: number) {
        return MovieModel.getById(id);
    }

    async create(data: { title: string; director: string; year: number; genres: string[] }) {
        if (!data.genres || data.genres.length === 0) {
            throw new Error('Se requiere al menos un género');
        }

        // Convertir nombres de géneros a IDs numéricos
        const genreIds = await MovieModel.getGenreIdsByName(data.genres);

        return MovieModel.create(
            { title: data.title, director: data.director, year: data.year },
            genreIds
        );
    }

    async update(
        id: number,
        data: { title?: string; director?: string; year?: number; genres?: string[] }
    ) {
        let genreIds;
        if (data.genres) {
            genreIds = await MovieModel.getGenreIdsByName(data.genres);
        }

        return MovieModel.update(id, data, genreIds);
    }

    async remove(id: number) {
        await MovieModel.delete(id);
        return { message: 'Película eliminada' };
    }
}
