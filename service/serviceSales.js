const modelSales = require('../models/modelSales');

const serviceInsertSales = async (sales) => {
  return await modelSales.insertSales(sales);
};

module.exports = {
  serviceInsertSales
};