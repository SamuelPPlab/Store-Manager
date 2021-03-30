const { Router } = require('express');
const {
  createProduct,
  ProductList,
  findById,
  update,
  remove,
  findSalesById,
  salesList,
  createSales,
  saleUpdate,
  salesRemove
} = require('../service/storeService');

const saleController = new Router();
const { ObjectId } = require('mongodb');
const {
  validateCreate,
  rightId,
  nameExist,
  salesId,
  checkQuantitySold,
  rightIdSales,
  updateStock,
  resetStock
} = require('../middleware/storeMiddleware');

saleController.get('/', async (req, res) => {
  const list = await salesList();
  const okay = 200;

  res.status(okay).json({ sales: list });
});
saleController.get('/:id', salesId, async (req, res) => {
  const { id } = req.params;
  const okay = 200;
  const salesById = await findSalesById(id);
  res.status(okay).json(salesById);
});
saleController.post('/', checkQuantitySold, updateStock, async (req, res) => {
  const deBoa = 200;
  const products = req.body;
  const { ops } = await createSales(products);

  res.status(deBoa).json(ops[0]);
});

saleController.put('/:id', checkQuantitySold, async (req, res) => {
  const { id } = req.params;
  const products = req.body;
  console.log();
  const okay = 200;
  await saleUpdate(id, products);

  res.status(okay)
    .json({ _id: id, itensSold: products });
});
saleController.delete('/:id', rightIdSales, resetStock, async (req, res) => {
  const { id } = req.params;
  const okay = 200;
  const salesById = await findSalesById(id);
  await salesRemove(id);

  res.status(okay).json(salesById);
});
module.exports = saleController;
