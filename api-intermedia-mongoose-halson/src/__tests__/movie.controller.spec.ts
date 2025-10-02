/// <reference types="vitest" />
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { createMovie } from '../api/controllers/movie.controller';
import { Request, Response } from 'express';
import { Types } from 'mongoose';

// 🎭 Mockeamos los modelos de mongoose
vi.mock('../database/models/genre.model', () => ({
    default: {
        findOne: vi.fn(),
        prototype: {
            save: vi.fn(),
        },
    },
}));

vi.mock('../database/models/movie.model', () => ({
    default: vi.fn().mockImplementation(function (this: any, data: any) {
        Object.assign(this, data);
        this.save = vi.fn().mockResolvedValue(this);
    }),
}));

// Importar después de los mocks
import Movie from '../database/models/movie.model';
import Genre from '../database/models/genre.model';

describe('MovieController', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        req = {};
        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        vi.clearAllMocks();
    });

    it('should create a movie', async () => {
        req.body = {
            title: 'Inception',
            director: 'Christopher Nolan',
            year: 2010,
            genres: ['Acción', 'Ciencia ficción'],
        };

        // simulamos que ningún género existe
        (Genre.findOne as unknown as Mock).mockResolvedValue(null);

        // cada vez que se cree un Genre, lo devolvemos con ObjectId
        (Genre as any).mockImplementation(function (this: any, data: { name: string }) {
            this._id = new Types.ObjectId();
            this.name = data.name;
            this.save = vi.fn().mockResolvedValue(this);
        });

        await createMovie(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(201);
        const jsonArg = (res.json as any).mock.calls[0][0];
        expect(jsonArg.movie.title).toBe('Inception');
        expect(jsonArg.movie.genres).toHaveLength(2);
    });
});
