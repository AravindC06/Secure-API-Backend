const express = require("express");
const { category, color, size, product } = require("../controllers/productController");

const router = express.Router();

router.get("/", product);
router.get("/categories", category);
router.get("/sizes", size);
router.get("/colors", color);

module.exports = router;
