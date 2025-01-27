const mongoose = require("mongoose");

const ColorsItemSchema = mongoose.Schema(
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

const ColorSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    order: { type: Number, required: true },
    items: { type: [ColorsItemSchema], required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Color", ColorSchema);
