import mongoose from "mongoose";
const stockSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    periority: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },

    catigoryid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

const Stock = mongoose.model("Stock", stockSchema);
export default Stock;
