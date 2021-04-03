const { Router } = require('express');
const productService = require('../service/productService');

const productController = new Router();
const { ObjectId } = require('mongodb');
const { validateCreate } = require('../middleware/storeMiddleware');

productController.post('/', validateCreate, async (req, res) => {
  const deBoa = 201;
  const product = req.body;
  const { ops } = await productService.createProduct(product);


  res.status(deBoa).json(ops[0]);
});
module.exports = productController; 
