const SUCCESS = 200;
const { Router } = require('express');

const {
  validateSaleQuantity,
  validateProductId,
} = require('../service/salesService');
const { salesProduct } =require('../models/saleModel');

const Sales = new Router();

Sales.post('/', validateSaleQuantity, validateProductId, async (req, res) => {
  const sale = await salesProduct(req.body);
  return res.status(SUCCESS).json(sale);
});

Sales.get('/', async (req, res) => {
  const allSales = await getAllSales();
  return res.status(SUCCESS).json({ sales: allSales });
});

module.exports = { Sales };
