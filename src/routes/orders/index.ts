import express, { Router } from "express";
import { createOrder, listOrders, updateOrderStatus } from "./controller";

const orders: Router = express.Router();
orders.get("/", ...listOrders);
orders.post("/", ...createOrder);
orders.patch("/:id/estado", ...updateOrderStatus);

export default orders;
