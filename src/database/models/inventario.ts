import { Schema, model } from "mongoose";

const InventarioSchema = new Schema(
  {
    fecha_actualizacion: {
      type: Date,
      default: Date.now,
    },

    cantidad: {
      type: Number,
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

export default model("Inventario", InventarioSchema);