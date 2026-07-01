import { Schema, model } from "mongoose";

const DetallePedidoSchema = new Schema(
  {
    cantidad: {
      type: Number,
      required: true,
    },

    subtotal: {
      type: Number,
      required: true,
    },

    pedido: {
      type: Schema.Types.ObjectId,
      ref: "Pedido",
      required: true,
    },

    producto: {
      type: Schema.Types.ObjectId,
      ref: "Producto",
      required: true,
    },
  },
  { timestamps: true }
);

export default model("DetallePedido", DetallePedidoSchema);