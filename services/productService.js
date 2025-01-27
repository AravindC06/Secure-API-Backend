const Category = require("../models/Category");
const Colors = require("../models/Colors");
const Product = require("../models/Product");
const Size = require("../models/Size");
const responseFormatter = require("../utils/responseFormatter");

const productService = {
  getAllProducts: async () => {
    try {
      const ProductData = await Product.find();
      return ProductData;
    } catch (error) {
      return responseFormatter(res, 500, "Error fetching Products Data from database", error);
    }
  },

  getCategoryData: async () => {
    try {
      const CategoryData = await Category.find();
      return CategoryData;
    } catch (error) {
      return responseFormatter(res, 500, "Error fetching Category Data from database", error);
    }
  },

  getSizeData: async () => {
    try {
      const SizeData = await Size.find();
      return SizeData;
    } catch (error) {
      return responseFormatter(res, 500, "Error fetching Category Data from database", error);
    }
  },

  getColorData: async () => {
    try {
      const ColorData = await Colors.find();
      return ColorData;
    } catch (error) {
      return responseFormatter(res, 500, "Error fetching Category Data from database", error);
    }
  },
};

module.exports = productService;
