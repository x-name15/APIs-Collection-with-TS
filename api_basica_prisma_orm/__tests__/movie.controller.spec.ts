import { getMovies, getMovieById, createMovie, updateMovie, deleteMovie }
    from "../src/api/controllers/movie.controller";
import { prisma } from "../src/database/lib/prisma";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock de Prisma
vi.mock("../src/database/lib/prisma", () => ({
    prisma: {
        movie: {
            findMany: vi.fn(),
            findUnique: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
        },
        genre: {
            upsert: vi.fn(),
        },
    },
}));

const mockReq = (body = {}, params = {}) => ({ body, params });
const mockRes = () => {
    const res: any = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
};
const mockNext = vi.fn();

describe("Movie Controller", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("getMovies -> devuelve lista de películas", async () => {
        const moviesMock = [{ id: "1", title: "Pulp Fiction" }];
        (prisma.movie.findMany as any).mockResolvedValue(moviesMock);

        const req = mockReq();
        const res = mockRes();

        await getMovies(req, res, mockNext);

        expect(res.json).toHaveBeenCalledWith(moviesMock);
    });

    it("getMovieById -> devuelve película por id", async () => {
        const movieMock = { id: "1", title: "Pulp Fiction" };
        (prisma.movie.findUnique as any).mockResolvedValue(movieMock);

        const req = mockReq({}, { id: "1" });
        const res = mockRes();

        await getMovieById(req, res, mockNext);

        expect(res.json).toHaveBeenCalledWith(movieMock);
    });

    it("createMovie -> crea película", async () => {
        const movieMock = { id: "1", title: "Pulp Fiction", genres: [{ name: "Crimen" }] };
        (prisma.movie.create as any).mockResolvedValue(movieMock);

        const req = mockReq({
            title: "Pulp Fiction",
            director: "Quentin Tarantino",
            year: 1994,
            genres: ["Crimen"]
        });
        const res = mockRes();

        await createMovie(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(movieMock);
    });

    it("updateMovie -> actualiza película", async () => {
        const updatedMovie = { id: "1", title: "Pulp Fiction 2", genres: [{ name: "Acción" }] };
        (prisma.genre.upsert as any).mockResolvedValue({ id: "g1", name: "Acción" });
        (prisma.movie.update as any).mockResolvedValue(updatedMovie);

        const req = mockReq({ title: "Pulp Fiction 2", director: "QT", year: 1995, genres: ["Acción"] }, { id: "1" });
        const res = mockRes();

        await updateMovie(req, res, mockNext);

        expect(res.json).toHaveBeenCalledWith({ message: "Película actualizada", movie: updatedMovie });
    });

    it("deleteMovie -> elimina película", async () => {
        (prisma.movie.delete as any).mockResolvedValue({});

        const req = mockReq({}, { id: "1" });
        const res = mockRes();

        await deleteMovie(req, res, mockNext);

        expect(res.json).toHaveBeenCalledWith({ message: "Película eliminada" });
    });
});
