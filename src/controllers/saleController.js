const saleService = require('../services/saleService');
const rescue = require('express-rescue');
const { status, errors } = require('../utils/status');
const { response } = require('express');
const { throwError } = require('../utils/errorHandler');

const createSale = async (req, res) => {
  const { body } = req;

  const createdSale = await saleService.createSale(body);

  res.status(status.ok).json(createdSale);
};

const getAllSales = async (req, res) => {
  const sales = await saleService.getAllSales();
  res.status(status.ok).json(sales);
};

const getSaleById = rescue(async (req, res) => {
  const { id } = req.params;

  const getSales = await saleService.getSaleById(id);

  if (!getSales) throw new throwError(status.notFound, errors.saleNotFound);

  res.status(status.ok).json(getSales);
});

const updateSale = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;
  const responsePayload = await saleService.updateSale(id, sale);
  res.status(status.ok).json(responsePayload);
};

const deleteSale = rescue(async (req, res) => {
  const { id } = req.params;
  const responsePayload = await saleService.deleteSale(id);
  res.status(status.ok).json(responsePayload);
});

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
