const mongoose = require("mongoose");

const CategoryItemSchema = mongoose.Schema(
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

const CategorySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    order: { type: Number, required: true },
    items: { type: [CategoryItemSchema], required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", CategorySchema);
