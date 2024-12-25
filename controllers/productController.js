const ProductController = require("../models/productModel");

exports.productDetails = (req, res, next) => {
  ProductController.productDetails()
    .then((productDetails) => {
      res.status(200).send(productDetails);
    })
    .catch((err) => {
      console.log(err);
      next();
    });
};

exports.orderDetails = (req, res, next) => {
  // const { id } = req.body;
  const { id } = req.query;
  ProductController.orderByProductId(id)
    .then((orderDetails) => {
      res.status(200).send(orderDetails);
    })
    .catch((err) => {
      console.log(err);
      next();
    });
};
