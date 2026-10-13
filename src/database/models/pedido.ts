import { Schema, model } from "mongoose";

export const ESTADOS_PEDIDO = ["PENDIENTE", "ACEPTADO", "RECHAZADO"] as const;

const PedidoSchema = new Schema({
  fecha: { type: Date, default: Date.now },
  estado: { type: String, enum: ESTADOS_PEDIDO, default: "PENDIENTE", required: true, index: true },
  total: { type: Number, required: true, min: 0 },
  cliente: { type: Schema.Types.ObjectId, ref: "Cliente", required: true, index: true },
  articulos: [{
    productoId: { type: Number, required: true },
    nombre: { type: String, required: true },
    precio: { type: Number, required: true, min: 0 },
    cantidad: { type: Number, required: true, min: 1 },
  }],
  metodoPago: { type: String, required: true },
  departamento: { type: String, required: true, trim: true },
  ciudad: { type: String, required: true, trim: true },
  estadoActualizadoEn: { type: Date },
}, { timestamps: true });

export default model("Pedido", PedidoSchema);
