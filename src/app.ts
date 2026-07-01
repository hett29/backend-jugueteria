import express from "express";
import cors from "cors";


const app = express();


// middlewares
app.use(cors());
app.use(express.json());


// ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando ");
});


export default app;