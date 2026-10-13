import express, { Router } from "express";
import { createOrder, listMyOrders, listOrders, updateOrderStatus } from "./controller";

const orders: Router = express.Router();
orders.get("/mis-pedidos", ...listMyOrders);
orders.get("/", ...listOrders);
orders.post("/", ...createOrder);
orders.patch("/:id/estado", ...updateOrderStatus);

export default orders;
