const { Router } = require('express');
const { createSale, getAllSales, getSaleById,
  updateSale, deleteSale } = require('../models/salesModel');
const salesValidator = require('../services/salesValidator');
const stockChecker = require('../services/stockChecker');
const idValidator = require('../services/idValidator');

const SalesController = new Router();

const SUCCESS = 200;
const CREATED = 201;
const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;

const notFound = {
  err: {
    code: 'not_found',
    message: 'Sale not found',
  },
};

const wrongSaleId = {
  err: {
    code: 'invalid_data',
    message: 'Wrong sale ID format',
  },
};

SalesController.get('/', async (req, res) => {
  const sales = await getAllSales();
  res.status(SUCCESS).json({ sales });
});

SalesController.get('/:id', async (req, res) => {
  const { id } = req.params;
  const isIdValid = idValidator(id);
  if (!isIdValid) {
    return res.status(NOT_FOUND).json(notFound);
  }
  const sale = await getSaleById(id);
  if (!sale) {
    return res.status(NOT_FOUND).json(notFound);
  }
  res.status(SUCCESS).json(sale);
});

SalesController.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const isIdValid = idValidator(id);
  if (!isIdValid) {
    return res.status(UNPROCESSABLE_ENTITY).json(wrongSaleId);
  }
  const response = await getSaleById(id);
  await deleteSale(id);
  res.status(SUCCESS).json(response);
});

SalesController.put('/:id', async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;
  const validatingSale = salesValidator(itensSold);
  if (validatingSale !== 'All good!') {
    return res.status(UNPROCESSABLE_ENTITY).json({ 
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  } else {
    await updateSale(id, itensSold);
    return res.status(SUCCESS).json({ _id: id, itensSold });
  }
});

SalesController.post('/', stockChecker, async (req, res) => {
  const itensSold = req.body;
  console.log('chegou aqui')
  const { insertedId } = await createSale(itensSold);
  const response = { _id: insertedId, itensSold };
  res.status(SUCCESS).json(response);
});

module.exports = SalesController;
