import { prisma } from '../lib/prisma'; // tu instancia de Prisma
import type { Movie, Genre } from '@prisma/client';

export type MovieWithGenres = Movie & { genres: Genre[] };

export class MovieModel {
    static async getAll(): Promise<Movie[]> {
        return prisma.movie.findMany({ include: { genres: true } });
    }

    static async getById(id: number): Promise<Movie | null> {
        return prisma.movie.findUnique({ where: { id }, include: { genres: true } });
    }

    static async create(data: { title: string; director: string; year: number }, genres: number[]) {
        return prisma.movie.create({
            data: {
                ...data,
                genres: { connect: genres.map(id => ({ id })) },
            },
            include: { genres: true },
        });
    }

    static async update(
        id: number,
        data: { title?: string; director?: string; year?: number },
        genres?: number[]
    ) {
        return prisma.movie.update({
            where: { id },
            data: {
                ...data,
                ...(genres ? { genres: { set: genres.map(id => ({ id })) } } : {}),
            },
            include: { genres: true },
        });
    }

    static async delete(id: number) {
        await prisma.movie.delete({ where: { id } });
    }

    static async getGenreIdsByName(names: string[]): Promise<number[]> {
        const genreIds: number[] = [];

        for (const name of names) {
            let genre = await prisma.genre.findUnique({ where: { name } });

            if (!genre) {
                genre = await prisma.genre.create({ data: { name } });
            }

            genreIds.push(genre.id);
        }

        return genreIds;
    }
}
