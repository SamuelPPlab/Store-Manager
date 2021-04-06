const { Router } = require('express');
const { createSale, getAllSales, getSaleById,
  updateSale, deleteSale } = require('../models/salesModel');
const { salesValidator } = require('../services/salesValidator');
const stockChecker = require('../services/stockChecker');
const idValidator = require('../services/idValidator');

const SalesController = new Router();

const SUCCESS = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTITY = 422;

const notFound = {
  err: {
    code: 'invalid_data',
    message: 'Sale not found',
  },
};

const wrongSaleId = {
  err: {
    code: 'invalid_data',
    message: 'Wrong sale id format',
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
    return res.status(UNPROCESSABLE_ENTITY).json(notFound);
  }
  const sale = await getSaleById(id);
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

  if (validatingSale !== 'Sales are valid!') {
    return res.status(validatingSale.status).json(validatingSale.error);
  }
  await updateSale(id, itensSold);
  res.status(SUCCESS).json({ id, itensSold });
});

SalesController.post('/', stockChecker, async (req, res) => {
  const itensSold = req.body;

  const areTheSalesValid = await salesValidator(itensSold);

  if (areTheSalesValid !== 'Sales are valid!') {
    return res.status(areTheSalesValid.status).json(areTheSalesValid.error);
  }

  const { insertedId } = await createSale(itensSold);
  const response = { id: insertedId, itensSold };
  res.status(CREATED).json(response);
});



module.exports = SalesController;
