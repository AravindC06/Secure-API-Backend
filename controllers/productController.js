const responseFormatter = require("../utils/responseFormatter");
const Category = require("../models/Category");
const Colors = require("../models/Colors");
const Size = require("../models/Size");
const productService = require("../services/productService");
const Product = require("../models/Product");

exports.product = async (req, res) => {
  const products = await productService.getAllProducts();
  console.log("Products : ,", products);
  const formattedProducts = products.map((product) => ({
    productId: product.productId,
    name: product.name,
    price: product.price,
    salePrice: product.salePrice,
    image: product.image,
    category: product.category,
    size: product.size,
    color: product.color,
    label: product.label,
  }));
  return responseFormatter(res, 200, "Category Data has been fetched successfully!", formattedProducts);
};

exports.category = async (req, res) => {
  try {
    const categories = await productService.getCategoryData();
    const formattedCategories = categories.map((category) => ({
      name: category.name,
      order: category.order,
      items: category.items.map((item) => ({
        id: item.id,
        name: item.name,
        path: item.path,
        order: item.order,
      })),
    }));
    return responseFormatter(res, 200, "Category Data has been fetched successfully!", formattedCategories);
  } catch (error) {
    responseFormatter(res, 500, "Failed to fetch data category, check server", error);
  }
};

exports.size = async (req, res) => {
  try {
    const size = await productService.getSizeData();
    const formattedSize = size.map((size) => ({
      name: size.name,
      order: size.order,
      items: size.items.map((item) => ({
        id: item.id,
        name: item.name,
        path: item.path,
        order: item.order,
      })),
    }));
    return responseFormatter(res, 200, "Size Data has been fetched successfully!", formattedSize);
  } catch (error) {
    responseFormatter(res, 500, "Failed to fetch data size, check server", error);
  }
};

exports.color = async (req, res) => {
  try {
    const color = await productService.getColorData();
    const formattedColor = color.map((color) => ({
      name: color.name,
      order: color.order,
      items: color.items.map((item) => ({
        id: item.id,
        name: item.name,
        path: item.path,
        order: item.order,
      })),
    }));
    return responseFormatter(res, 200, "Color Data has been fetched successfully!", formattedColor);
  } catch (error) {
    responseFormatter(res, 500, "Failed to fetch data color, check server", error);
  }
};
