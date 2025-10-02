import express from "express";
import path from "path";
import connectDB from "./database/database";
import movieRoutes from "./api/routes/movie.routes";
const app = express();
app.use(express.json());
app.use("/frontend", express.static(path.resolve("frontend"))); // path absoluto desde raíz
app.use("/api/movies", movieRoutes);
connectDB().then(() => {
  const PORT = process.env.PORT || 7000; // puerto donde abres localhost:7000
  app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
});
