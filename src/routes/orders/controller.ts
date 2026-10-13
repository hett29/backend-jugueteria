import { Request, Response, NextFunction } from "express";
import passport from "passport";
import Pedido from "../../database/models/pedido";

const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if ((req.user as any)?.rol !== "ADMIN") {
    return res.status(403).json({ message: "Solo un administrador puede realizar esta acción." });
  }
  next();
};

export const listOrders = [
  passport.authenticate("jwt", { session: false }),
  requireAdmin,
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const pedidos = await Pedido.find().populate("cliente", "nombre apellido correo telefono").sort({ createdAt: -1 });
      return res.json({ pedidos });
    } catch (error) {
      return next(error);
    }
  },
];

export const createOrder = [
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { articulos, metodoPago, departamento, ciudad } = req.body ?? {};
      if (!Array.isArray(articulos) || articulos.length === 0 || !metodoPago ||
          typeof departamento !== "string" || !departamento.trim() ||
          typeof ciudad !== "string" || !ciudad.trim()) {
        return res.status(400).json({ message: "Incluye artículos, método de pago, departamento y ciudad." });
      }
      const validItems = articulos.every((item: any) =>
        Number.isInteger(item.productoId) && typeof item.nombre === "string" &&
        Number.isFinite(item.precio) && item.precio >= 0 &&
        Number.isInteger(item.cantidad) && item.cantidad > 0
      );
      if (!validItems) return res.status(400).json({ message: "Los artículos del pedido no son válidos." });

      const total = articulos.reduce((sum: number, item: any) => sum + item.precio * item.cantidad, 0);
      const pedido = await Pedido.create({
        cliente: (req.user as any)._id,
        articulos,
        total,
        metodoPago,
        departamento: departamento.trim(),
        ciudad: ciudad.trim(),
        estado: "PENDIENTE",
      });
      return res.status(201).json({ pedido, message: "Pedido registrado con estado pendiente." });
    } catch (error) {
      return next(error);
    }
  },
];

export const updateOrderStatus = [
  passport.authenticate("jwt", { session: false }),
  requireAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const estado = req.body?.estado;
      if (!["PENDIENTE", "ACEPTADO", "RECHAZADO"].includes(estado)) {
        return res.status(400).json({ message: "Estado de pedido no válido." });
      }
      const pedido = await Pedido.findByIdAndUpdate(
        req.params.id,
        { estado, estadoActualizadoEn: new Date() },
        { new: true, runValidators: true },
      ).populate("cliente", "nombre apellido correo telefono");
      if (!pedido) return res.status(404).json({ message: "No se encontró el pedido." });
      return res.json({ pedido, message: "Estado del pedido actualizado." });
    } catch (error) {
      return next(error);
    }
  },
];
