const SUCCESS = 200;
const NOT_FOUND = 404;
const { Router } = require('express');

const {
  validateSaleQuantity,
  validateProductId,
  validateSaleId,
  getAllSales,
  editSales,
  getSaleById,
  validateDeleteId,
  deleteSale,
  editQuantityAfterSale,
  editAfterDelete,
} = require('../service/salesService');
const { salesProduct } =require('../models/saleModel');

const Sales = new Router();

Sales.post('/', validateSaleQuantity, validateProductId, async (req, res) => {
  const sale = await salesProduct(req.body);
  await editQuantityAfterSale(sale);
  await res.status(SUCCESS).json(sale);
});

Sales.get('/', async (_req, res) => {
  const allSales = await getAllSales();
  return res.status(SUCCESS).json({ sales: allSales });
});

Sales.get('/:id', validateSaleId, async ( req, res) => {
  const { id } = req.params;
  const saleById = await getSaleById(id);
  if (!saleById) return res.status(NOT_FOUND).json({
    err: {
      code: 'not_found',
      message: 'Sale not found',
    }
  });
  return res.status(SUCCESS).json(saleById);
});

Sales.put('/:id', validateSaleId, validateSaleQuantity, async (req, res) => {
  const { id } = req.params;
  await editSales(id, req.body);
  const sale = await getSaleById(id);
  return res.status(SUCCESS).json(sale);
});

Sales.delete('/:id', validateDeleteId, async (req, res) => {
  const { id } = req.params;
  const sale = await getSaleById(id);
  await deleteSale(id);

  await editAfterDelete(sale);

  await res.status(SUCCESS).json(sale);
});

module.exports = { Sales };
