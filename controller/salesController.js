const SUCCESS = 200;
const { Router } = require('express');

const {
  validateSaleQuantity,
  validateProductId,
} = require('../service/salesService');
const { salesProduct } =require('../models/saleModel');

const Sales = new Router();

Product.post('/', validateSaleQuantity, validateProductId, async (req, res) => {
  const sale = await salesProduct(req);
  return res.status(SUCCESS).json(sale);
});

module.exports = { Sales };
