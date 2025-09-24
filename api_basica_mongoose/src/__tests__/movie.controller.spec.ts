import { vi, describe, it, expect, beforeEach } from 'vitest';
import { getMovies, getMovieById, createMovie, updateMovie, deleteMovie } from '../../src/api/controllers/movie.controller';
import Movie from '../../src/database/models/movie.model';
import Genre from '../../src/database/models/genre.model';
import { Request, Response } from 'express';

// Mocks unificados para el modelo de Mongoose
vi.mock('../../src/database/models/movie.model', () => {
    const movieMock = vi.fn();
    Object.assign(movieMock, {
        find: vi.fn(() => ({
            populate: vi.fn().mockReturnThis(),
            exec: vi.fn().mockResolvedValue([]),
        })),
        findById: vi.fn(() => ({
            populate: vi.fn().mockReturnThis(),
            exec: vi.fn().mockResolvedValue(null),
        })),
        findByIdAndUpdate: vi.fn(),
        findByIdAndDelete: vi.fn(),
        prototype: {
            save: vi.fn(),
        },
    });
    return { default: movieMock };
});

vi.mock('../../src/database/models/genre.model', () => {
    const genreMock = vi.fn();
    Object.assign(genreMock, {
        findOne: vi.fn(),
        prototype: {
            save: vi.fn(),
        },
    });
    return { default: genreMock };
});

describe('getMovies', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            json: vi.fn(),
            status: vi.fn().mockReturnThis(),
        };
        vi.clearAllMocks();
    });

    it('debería devolver todas las películas con un status 200', async () => {
        const mockMovies = [
            { title: 'Inception', director: 'Christopher Nolan', year: 2010, genres: [{ _id: '1', genre: 'Sci-Fi' }] },
            { title: 'Parasite', director: 'Bong Joon-ho', year: 2019, genres: [{ _id: '2', genre: 'Thriller' }] },
        ];

        vi.spyOn(Movie, 'find' as any).mockReturnValue({
            populate: vi.fn().mockResolvedValue(mockMovies)
        });

        await getMovies(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(mockMovies);
    });

    it('debería devolver un status 500 si ocurre un error al obtener las películas', async () => {
        const errorMessage = 'Database connection error';
        vi.spyOn(Movie, 'find' as any).mockImplementationOnce(() => { throw new Error(errorMessage); });

        await getMovies(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Error al obtener las películas',
            error: errorMessage
        });
    });
});


describe('getMovieById', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            json: vi.fn(),
            status: vi.fn().mockReturnThis(),
        };
        vi.clearAllMocks();
    });

    it('debería devolver una película por ID con un status 200', async () => {
        const mockMovie = { _id: '123movieid', title: 'Inception', director: 'Christopher Nolan', year: 2010, genres: [{ _id: '1', genre: 'Sci-Fi' }] };
        mockRequest.params = { id: mockMovie._id };

        (Movie.findById as any).mockImplementationOnce(() => ({ populate: vi.fn().mockResolvedValue(mockMovie) }));

        await getMovieById(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith(mockMovie);
    });

    it('debería devolver un status 404 si la película no es encontrada', async () => {
        mockRequest.params = { id: 'non-existent-id' };
        (Movie.findById as any).mockImplementationOnce(() => ({ populate: vi.fn().mockResolvedValue(null) }));

        await getMovieById(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Película no encontrada' });
    });

    it('debería devolver un status 500 si ocurre un error del servidor', async () => {
        const errorMessage = 'Server error';
        mockRequest.params = { id: '123movieid' };
        (Movie.findById as any).mockImplementationOnce(() => { throw new Error(errorMessage); });

        await getMovieById(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: "Error al obtener la película", error: errorMessage });
    });
});

describe("createMovie", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    const mockMovieData = { title: "Interstellar", director: "Christopher Nolan", year: 2014, genres: ["Sci-Fi", "Adventure"] };

    beforeEach(() => {
        mockRequest = {};
        mockResponse = { json: vi.fn(), status: vi.fn().mockReturnThis() };
        vi.clearAllMocks();
    });

    it("debería crear una película y devolverla con un status 201", async () => {
        mockRequest.body = mockMovieData;
        const mockSavedGenres = [{ _id: 'genre-id-1', genre: 'Sci-Fi' }, { _id: 'genre-id-2', genre: 'Adventure' }];

        (Movie as any).mockImplementationOnce(() => ({ ...mockMovieData, save: vi.fn().mockResolvedValue({ _id: "movie-id-1", ...mockMovieData, genres: mockSavedGenres }) }));
        (Genre.findOne as any).mockResolvedValueOnce(null).mockResolvedValueOnce(null);
        (Genre.prototype.save as any).mockResolvedValueOnce(mockSavedGenres[0]).mockResolvedValueOnce(mockSavedGenres[1]);

        await createMovie(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: "Película creada con éxito", movie: expect.objectContaining({ title: "Interstellar", genres: expect.any(Array) }) });
    });

    it('debería devolver un status 400 si la lista de géneros está vacía', async () => {
        mockRequest.body = { ...mockMovieData, genres: [] };
        await createMovie(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Se requiere al menos un género' });
    });

    it('debería devolver un status 500 si ocurre un error al crear la película', async () => {
        const errorMessage = 'Database save error';
        mockRequest.body = { ...mockMovieData, genres: ['Sci-Fi'] };
        (Genre.findOne as any).mockResolvedValueOnce({ _id: 'genre-id-1', name: 'Sci-Fi' });
        (Movie.prototype.save as any).mockRejectedValueOnce(new Error(errorMessage));

        await createMovie(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error al crear la película' });
    });
});

describe('updateMovie', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = { json: vi.fn(), status: vi.fn().mockReturnThis() };
        vi.clearAllMocks();
    });

    it('debería actualizar una película y devolverla correctamente', async () => {
        const mockMovieData = { title: "Updated Movie", director: "New Director", year: 2020, genres: ["Action","Thriller"] };
        const updatedMovieResult = { _id:'123movieid', ...mockMovieData, genres:[{_id:'1', genre:'Action'},{_id:'2', genre:'Thriller'}] };

        mockRequest.params = { id:'123movieid' };
        mockRequest.body = mockMovieData;

        (Genre.findOne as any).mockResolvedValueOnce({ _id:'1', genre:'Action' }).mockResolvedValueOnce({ _id:'2', genre:'Thriller' });
        (Movie.findByIdAndUpdate as any).mockResolvedValue(updatedMovieResult);

        await updateMovie(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith({ message:"Película actualizada", movie: updatedMovieResult });
    });

    it('debería devolver un status 404 si la película no es encontrada', async () => {
        mockRequest.params = { id:'non-existent-id' };
        mockRequest.body = { genres: [] };
        (Movie.findByIdAndUpdate as any).mockResolvedValueOnce(null);

        await updateMovie(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ message:"Película no encontrada" });
    });

    it('debería devolver un status 500 si ocurre un error del servidor', async () => {
        const errorMessage = 'Database update error';
        mockRequest.params = { id:'123movieid' };
        mockRequest.body = { genres:['Sci-Fi'] };
        (Genre.findOne as any).mockResolvedValueOnce({ _id:'1', genre:'Sci-Fi' });
        (Movie.findByIdAndUpdate as any).mockRejectedValueOnce(new Error(errorMessage));

        await updateMovie(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ message:"Error al actualizar la película", error:errorMessage });
    });
});

describe('deleteMovie', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = { json: vi.fn(), status: vi.fn().mockReturnThis() };
        vi.clearAllMocks();
    });

    it('debería eliminar una película y devolver un mensaje de éxito', async () => {
        const mockMovie = { _id:'123movieid', title:'Movie to Delete' };
        mockRequest.params = { id: mockMovie._id };
        (Movie.findByIdAndDelete as any).mockResolvedValue(mockMovie);

        await deleteMovie(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.json).toHaveBeenCalledWith({ message:"Película eliminada" });
    });

    it('debería devolver un status 404 si la película no es encontrada', async () => {
        mockRequest.params = { id:'non-existent-id' };
        (Movie.findByIdAndDelete as any).mockResolvedValueOnce(null);

        await deleteMovie(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ message:"Película no encontrada" });
    });

    it('debería devolver un status 500 si ocurre un error del servidor', async () => {
        const errorMessage = 'Database delete error';
        mockRequest.params = { id:'123movieid' };
        (Movie.findByIdAndDelete as any).mockRejectedValueOnce(new Error(errorMessage));

        await deleteMovie(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ message:"Error al eliminar la película", error:errorMessage });
    });
});
