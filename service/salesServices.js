const {
  postSale,
  getAllSales,
  findSaleById,
  saleUpdate,
  saleDelete,
} = require('../models/salesModel');

const newSale = async (sale) => {
  return postSale(sale);
};

const findAllSales = async () => {
  return getAllSales();
};

const findSale = async (id) => {
  return findSaleById(id);
};

const updateSale = async (id, dataToUpdate) => {
  return saleUpdate(id, dataToUpdate);
};

const deleteSale = async (id) => {
  return saleDelete(id);
};

module.exports = {
  newSale,
  findAllSales,
  findSale,
  updateSale,
  deleteSale,
};
