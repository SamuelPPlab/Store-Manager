const saleService = require('../services/saleService');
const rescue = require('express-rescue');
const { status, errors } = require('../utils/status.js');
const { response } = require('express');
const { throwError } = require('../utils/errorHandler');

const createSale = rescue(async (req, res) => {
  const { body } = req;

  const createdSale = await saleService.createSale(body);

  res.status(status.ok).json(createdSale);
});

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
  const updatedSale = await saleService.updateSale(id, sale);

  res.status(status.ok).json(updatedSale);
};

const deleteSale = rescue(async (req, res) => {
  const { id } = req.params;

  const deletedSale = await saleService.deleteSale(id);

  res.status(status.ok).json(deletedSale);
});

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};