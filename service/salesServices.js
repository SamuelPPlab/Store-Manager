const {
  postSale,
  getAllSales,
  findSaleById,
  updateSale,
} = require('../models/storeModel');

const newSale = async (sale) => {
  return postSale(sale);
};

const findAllSales = async () => {
  return getAllSales();
};

const findSale = async (id) => {
  return findSaleById(id);
};

const saleUpdate = async (id, dataToUpdate) => {
  return updateSale(id, dataToUpdate);
};

module.exports = {
  newSale,
  findAllSales,
  findSale,
  saleUpdate,
};
