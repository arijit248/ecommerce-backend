const express = require("express");
const ProductController = require("./controllers/productController");
const route = express.Router();

route.post("/products", ProductController.productDetails);
route.post("/orders", ProductController.orderDetails);

module.exports = route;
