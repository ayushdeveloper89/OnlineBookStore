const mongoose = require("mongoose");
const Category = require('./category');

const BookInfoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BookInfo", BookInfoSchema);