const { utils, sales } = require('../models');
const { error } = require('../utils/dictionary');
const { validateSales } = require('../utils/validators');

const createSale = async (itensSold) => {
  await validateSales(itensSold);
  return utils.insertToDb('sales', { itensSold });
};

const getSales = async (id) => {
  const salesList = await utils.queryFromDb('sales', id);
  if (!salesList) throw new Error(error.invalidSale);
  return salesList;
};

const saleUpdate = async (id, body) => {
  await getSales(id);
  await validateSales(body);
  const promises = body.map( async (prod) => await sales.updateSales('sales', id, prod));
  const results = await Promise.all(promises);
  return results[results.length - 1];
};

const saleDelete = async (id) => {
  const salesList = await utils.queryFromDb('sales', id);
  if (!salesList) throw new Error(error.invalidSaleId);
  return utils.deleteFromDb('sales', id);
};

module.exports = {
  createSale,
  getSales,
  saleUpdate,
  saleDelete,
};