const mongoose = require("mongoose");
const Cart = require('./cart');

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "appUser" }, // admin role is "appAdmin"
    cart:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Cart
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);