const mongoose = require("mongoose");
const BookInfo = require('./bookInfo');

const CartSchema = new mongoose.Schema(
  {
    books:
    {
      type: [mongoose.Schema.Types.ObjectId],
      ref: BookInfo
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);