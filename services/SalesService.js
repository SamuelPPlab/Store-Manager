const Sales = require('../model/SalesModel');

const registerSale = async (productData) => {
  return Sales.registerSale(productData);
};

const getAll = async () => {
  return Sales.getAll();
};

const getById = async (id) => {
  return Sales.getById(id);
};

const updateSale = async (id, productData) => {
  return Sales.updateSale(id, productData);
};

const deleteSale = async (id) => {
  return Sales.deleteSale(id);
};

module.exports = {
  registerSale,
  getAll,
  getById,
  updateSale,
  deleteSale
};
