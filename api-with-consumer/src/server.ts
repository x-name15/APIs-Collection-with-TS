import express from "express";
import path from "path";
import connectDB from "./database/database";
import movieRoutes from "./api/routes/movie.routes";

const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());

// Sirve el front desde /frontend
app.use("/frontend", express.static(path.join(__dirname, "../frontend")));

// Endpoint root de la API, independiente del front
app.get("/", (req, res) => {
  res.json({ message: "API de películas viva ✅" });
});

// Todas las rutas de películas
app.use("/api/movies", movieRoutes);

connectDB()
    .then(() => {
      app.listen(PORT, () =>
          console.log(`Servidor corriendo en http://localhost:${PORT}`)
      );
    })
    .catch((err) => {
      console.error("Error conectando a la base de datos:", err);
    });
