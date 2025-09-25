import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Movie API Integration", () => {
    let movieId: number;

    beforeAll(async () => {
        await prisma.movie.deleteMany();
        await prisma.genre.deleteMany();
    });

    afterAll(async () => {
        // Limpiar después de los tests
        await prisma.movie.deleteMany();
        await prisma.genre.deleteMany();
        await prisma.$disconnect();
    });

    it("Crea una película con géneros", async () => {
        const movie = await prisma.movie.create({
            data: {
                title: "Pulp Fiction",
                director: "Quentin Tarantino",
                year: 1994,
                genres: {
                    connectOrCreate: [
                        { where: { name: "Crimen" }, create: { name: "Crimen" } },
                        { where: { name: "Thriller" }, create: { name: "Thriller" } },
                    ],
                },
            },
            include: { genres: true },
        });

        movieId = movie.id;

        expect(movie.title).toBe("Pulp Fiction");
        expect(movie.genres.length).toBe(2);
    });

    it("Lee la película creada", async () => {
        const movie = await prisma.movie.findUnique({
            where: { id: movieId },
            include: { genres: true },
        });

        expect(movie).not.toBeNull();
        expect(movie?.title).toBe("Pulp Fiction");
        expect(movie?.genres.map(g => g.name)).toContain("Crimen");
    });

    it("Actualiza la película y géneros", async () => {
        const updated = await prisma.movie.update({
            where: { id: movieId },
            data: {
                title: "Pulp Fiction - Updated",
                genres: {
                    connectOrCreate: [{ where: { name: "Drama" }, create: { name: "Drama" } }],
                },
            },
            include: { genres: true },
        });

        expect(updated.title).toBe("Pulp Fiction - Updated");
        expect(updated.genres.map(g => g.name)).toContain("Drama");
    });

    it("Elimina la película", async () => {
        await prisma.movie.delete({ where: { id: movieId } });
        const movie = await prisma.movie.findUnique({ where: { id: movieId } });
        expect(movie).toBeNull();
    });
});
