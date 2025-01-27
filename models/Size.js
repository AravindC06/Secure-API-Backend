const mongoose = require("mongoose");

const SizeItemSchema = mongoose.Schema(
  {
    id:{ type: Number, required: true  },
    name: { type: String, required: true },
    order: { type: Number, required: true },
  },
  {
    timestamps: true,
    _id: false,
  }
);

const SizeSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    order: { type: Number, required: true },
    items: { type: [SizeItemSchema], required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Size", SizeSchema);
