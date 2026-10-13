import express, { Router } from "express";
import auth from "./auth";
import orders from "./orders";

const v1: Router = express.Router();
v1.use("/auth", auth);
v1.use("/pedidos", orders);

export default v1;
