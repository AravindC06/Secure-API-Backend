const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  shortDescription: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
  },
  collectionTitle: {
    type: String,
  },
  label: {
    type: [String],
  },
  stockStatus: {
    type: String,
    default: "In Stock",
  },
  regularPrice: {
    type: Number,
    required: true,
  },
  salePrice: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  sku: {
    type: String,
  },
  size: {
    type: [String],
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  featuredImage: {
    type: [String],
    required: true,
  },
  galleryImage: {
    type: [String],
    required: true,
  },
  isActive: {
    type: Boolean,
  },
  isFeatured: {
    type: Boolean,
  },
});

ProductSchema.plugin(AutoIncrement, { inc_field: "productId", start_seq: 1 });

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
