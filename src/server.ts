import "dotenv/config";
import app from "./app";
import { connectDB } from "./database/connection";
import { env } from "./config/env";

const startServer = async () => {
  try {
    console.log("Iniciando servidor...");
    await connectDB();
    console.log("Base de datos conectada.");

    const PORT = Number(env.port);

    const server = app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });

    server.on("error", (err) => {
      console.error("Error del servidor:", err);
    });

    process.on("exit", (code) => {
      console.log("El proceso terminó con código:", code);
    });

  } catch (error) {
    console.error("Error al iniciar el servidor:");
    console.error(error);
  }
};

startServer();