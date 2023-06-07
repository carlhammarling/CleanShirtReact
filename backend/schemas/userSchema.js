const mongoose = require("mongoose");
const Cart = require("./cartSchema");

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    shoppingCart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cart" }],
    adress: { type: String, required: false },
    postalCode: { type: String, required: false },
    city: { type: String, required: false },
    country: { type: String, required: false },
    mobile: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
