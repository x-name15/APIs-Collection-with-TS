// src/api/controllers/movie.controller.ts
//xd

import { Request, Response, NextFunction } from 'express';
import { MovieService } from '../../structures/classes/movie.service';

const movieService = new MovieService();

export const getMovies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movies = await movieService.getAll();
    res.json(movies);
  } catch (err) {
    next(err);
  }
};

export const getMovieById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id); // <-- Convertimos a number
    if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

    const movie = await movieService.getById(id);
    if (!movie) return res.status(404).json({ message: 'Película no encontrada' });
    res.json(movie);
  } catch (err) {
    next(err);
  }
};

export const createMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movie = await movieService.create(req.body);
    res.status(201).json(movie);
  } catch (err: any) {
    if (err.message === 'Se requiere al menos un género') return res.status(400).json({ message: err.message });
    next(err);
  }
};

export const updateMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id); // <-- Convertimos a number
    if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

    const movie = await movieService.update(id, req.body);
    res.json({ message: 'Película actualizada', movie });
  } catch (err: any) {
    if (err.code === 'P2025') return res.status(404).json({ message: 'Película no encontrada' });
    next(err);
  }
};

export const deleteMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const result = await movieService.remove(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
