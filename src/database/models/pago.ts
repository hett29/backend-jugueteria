import { Schema, model } from "mongoose";

export const METODOS_PAGO = [
  "EFECTIVO",
  "TARJETA",
  "TRANSFERENCIA",
  "QR",
] as const;

const PagoSchema = new Schema(
  {
    metodo_pago: {
      type: String,
      enum: METODOS_PAGO,
      required: true,
    },

    monto_pago: {
      type: Number,
      required: true,
    },

    fecha_pago: {
      type: Date,
      default: Date.now,
    },

    pedido: {
      type: Schema.Types.ObjectId,
      ref: "Pedido",
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Pago", PagoSchema);