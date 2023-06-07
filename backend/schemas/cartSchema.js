const mongoose = require("mongoose");
const Product = require("./productSchema");
const User = require("./userSchema");

const cartSchema = mongoose.Schema(
  {
    orderLine: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        size: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    subTotal: { type: Number, required: false },
    delivery: { type: Number, required: false },
    totalPrice: { type: Number, required: false },
    payment: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
