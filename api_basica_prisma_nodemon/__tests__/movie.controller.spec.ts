import { vi, describe, it, expect, beforeEach } from 'vitest';
import { getMovies, getMovieById, createMovie, updateMovie, deleteMovie } from '../src/api/controllers/movie.controller';
import { MovieService } from '../src/structures/classes/movie.service';
import { type Request, type Response, type NextFunction } from 'express';

// Mock completo del módulo
vi.mock('../src/structures/classes/movie.service', () => {
    return {
        MovieService: vi.fn().mockImplementation(() => {
            return {
                getAll: vi.fn().mockResolvedValue([{ id: 1, title: 'Matrix', director: 'Wachowski', year: 1999, genres: [] }]),
                getById: vi.fn().mockResolvedValue({ id: 1, title: 'Matrix', director: 'Wachowski', year: 1999, genres: [] }),
                create: vi.fn().mockResolvedValue({ id: 2, title: 'Inception', director: 'Nolan', year: 2010, genres: [] }),
                update: vi.fn().mockResolvedValue({ id: 1, title: 'Matrix Reloaded', director: 'Wachowski', year: 2003, genres: [] }),
                remove: vi.fn().mockResolvedValue({ message: 'Película eliminada' }),
            };
        }),
    };
});

describe('Movie Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {};
        res = {
            json: vi.fn(),
            status: vi.fn().mockReturnThis(),
        };
        next = vi.fn();
    });

    it('getMovies > devuelve todas las películas', async () => {
        await getMovies(req as Request, res as Response, next);
        expect(res.json).toHaveBeenCalledWith([{ id: 1, title: 'Matrix', director: 'Wachowski', year: 1999, genres: [] }]);
    });

    it('getMovieById > devuelve película por id', async () => {
        req.params = { id: '1' };
        await getMovieById(req as Request, res as Response, next);
        expect(res.json).toHaveBeenCalledWith({ id: 1, title: 'Matrix', director: 'Wachowski', year: 1999, genres: [] });
    });

    it('createMovie > crea película', async () => {
        req.body = { title: 'Inception', director: 'Nolan', year: 2010, genres: [] };
        await createMovie(req as Request, res as Response, next);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ id: 2, title: 'Inception', director: 'Nolan', year: 2010, genres: [] });
    });

    it('updateMovie > actualiza película', async () => {
        req.params = { id: '1' };
        req.body = { title: 'Matrix Reloaded' };
        await updateMovie(req as Request, res as Response, next);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Película actualizada',
            movie: { id: 1, title: 'Matrix Reloaded', director: 'Wachowski', year: 2003, genres: [] },
        });
    });

    it('deleteMovie > elimina película', async () => {
        req.params = { id: '1' };
        await deleteMovie(req as Request, res as Response, next);
        expect(res.json).toHaveBeenCalledWith({ message: 'Película eliminada' });
    });
});
