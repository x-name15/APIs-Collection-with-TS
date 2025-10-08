import amqp from "amqplib";
import axios from "axios";
import { IMovie, MovieApiResponse } from "./types/movie.interface";

const RABBIT_HOST = process.env.RABBIT_HOST || "rabbitmq";
const RABBIT_USER = process.env.RABBIT_USER || "guest";
const RABBIT_PASSWORD = process.env.RABBIT_PASSWORD || "guest";
const RABBIT_URL = `amqp://${RABBIT_USER}:${RABBIT_PASSWORD}@${RABBIT_HOST}:5672`;

const API_URL = process.env.API_URL;

const QUEUE = "consume_movies";
const PROCESSED_QUEUE = "processed_movies";

const consumeMovies = async () => {
    const connection = await amqp.connect(RABBIT_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE, { durable: false });
    await channel.assertQueue(PROCESSED_QUEUE, { durable: false });

    console.log("Esperando mensajes en la cola:", QUEUE);

    channel.consume(QUEUE, async (msg) => {
        if (!msg) return;

        try {
            const content = JSON.parse(msg.content.toString());
            console.log("Mensaje recibido:", content);

            if (content.action !== "process_movies") {
                console.log("Acción no reconocida:", content.action);
                channel.ack(msg);
                return;
            }

            let nextUrl: string | null = `${API_URL}/api/movies?page=${content.page || 1}&limit=${content.limit || 200}`;
            if (content.genre) {
                nextUrl += `&genre=${content.genre}`;
            }

            while (nextUrl) {
                console.log("Consultando URL:", nextUrl);

                try {
                    new URL(nextUrl);
                } catch {
                    console.error("URL inválida:", nextUrl);
                    break;
                }

                const { data }: { data: MovieApiResponse } = await axios.get(nextUrl);
                const movies: IMovie[] = data._embedded.movies;

                movies.forEach((movie) => {
                    console.log("Procesando película:", movie.title);
                    const confirmationMsg = JSON.stringify({
                        movieId: movie._id,
                        title: movie.title,
                        processedAt: new Date().toISOString(),
                    });

                    channel.sendToQueue(PROCESSED_QUEUE, Buffer.from(confirmationMsg));
                });

                nextUrl = data._links.next ? `${API_URL}${data._links.next.href}` : null;
                await new Promise((res) => setTimeout(res, 500));
            }

            channel.ack(msg);
        } catch (err) {
            console.error("Error procesando mensaje:", err);
            channel.ack(msg);
        }
    });
};

consumeMovies().catch((err) => console.error("Error en consumer:", err));
