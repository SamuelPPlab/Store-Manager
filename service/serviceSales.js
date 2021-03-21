const modelSales = require('../models/modelSales');

const serviceInsertSales = async (sales) => {
  return await modelSales.insertSales(sales);
};

const serviceGetAllSales = async () => {
  return await modelSales.getAllSales();
};

const serviceGetSaleById = async (id) => {
  return await modelSales.findByIdSale(id);
};

const servicePutSaleById = async (id, sales) => {
  return await modelSales.putByIdSale(id, sales);
};

module.exports = {
  serviceInsertSales,
  serviceGetAllSales,
  serviceGetSaleById,
  servicePutSaleById,
};