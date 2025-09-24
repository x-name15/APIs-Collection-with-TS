import { Request, Response, NextFunction } from "express";
import { prisma } from "../../database/lib/prisma";

// GET /api/movies
export const getMovies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const movies = await prisma.movie.findMany({ include: { genres: true } });
    res.json(movies);
  } catch (err) {
    next(err);
  }
};

// GET /api/movies/:id
export const getMovieById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const movie = await prisma.movie.findUnique({
      where: { id: req.params.id },
      include: { genres: true }
    });

    if (!movie) {
      res.status(404).json({ message: "Película no encontrada" });
      return;
    }

    res.json(movie);
  } catch (err) {
    next(err);
  }
};

// POST /api/movies
export const createMovie = async (req: Request, res: Response, next: NextFunction) => {
  const { title, director, year, genres } = req.body;

  try {
    const movie = await prisma.movie.create({
      data: {
        title,
        director,
        year,
        genres: {
          connectOrCreate: genres.map((name: string) => ({
            where: { name },
            create: { name },
          })),
        },
      },
      include: { genres: true },
    });

    res.status(201).json(movie);
  } catch (err) {
    next(err);
  }
};

// PUT /api/movies/:id
export const updateMovie = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { title, director, year, genres } = req.body;

  try {
    const genreRecords = await Promise.all(
        genres.map((name: string) =>
            prisma.genre.upsert({
              where: { name },
              update: {},
              create: { name }
            })
        )
    );

    const updatedMovie = await prisma.movie.update({
      where: { id: req.params.id },
      data: {
        title,
        director,
        year,
        genres: {
          connect: genreRecords.map(g => ({ id: g.id }))
        }
      },
      include: { genres: true }
    });

    res.json({ message: "Película actualizada", movie: updatedMovie });
  } catch (err: any) {
    if (err.code === "P2025") {
      res.status(404).json({ message: "Película no encontrada" });
      return;
    }
    next(err);
  }
};

// DELETE /api/movies/:id
export const deleteMovie = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await prisma.movie.delete({ where: { id: req.params.id } });
    res.json({ message: "Película eliminada" });
  } catch (err: any) {
    if (err.code === "P2025") {
      res.status(404).json({ message: "Película no encontrada" });
      return;
    }
    next(err);
  }
};

