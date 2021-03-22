const Sales = require('../models/Sales');
const productsService = require('../services/productsService');
const saleDataValidation = require('./saleDataValidation');
const saleIDValidation = require('./saleIDValidation');
const saleExists = require('./saleExists');
const productStockValidation = require('./productStockValidation');

const getAll = async () => {
  return await Sales.getAll();
};

const findById = async (id) => {
  await saleExists(id);
  await saleIDValidation(id);
  return await Sales.findById(id);
};

const create = async (itensSold) => {
  await saleDataValidation(itensSold);
  
  for(let item of itensSold) {
    const dontHaveProductsInStock = await productStockValidation(item);

    if(dontHaveProductsInStock) throw({
      err: {
        'code': 'stock_problem',
        'message': 'Such amount is not permitted to sell'
      }
    });
  }

  const sale = await Sales.create(itensSold);
  itensSold
    .forEach((item) => {
      productsService.decreaseQuantity(item.productId, item.quantity);
    });
  return sale;
};

const update = async (id, sale) => {
  await saleExists(id);
  await saleIDValidation(id);
  await saleDataValidation(sale);
  return await Sales.update(id, sale);
};

const remove = async (id) => {
  await saleIDValidation(id);
  await saleExists(id);
  const { itensSold } = await Sales.findById(id);
  itensSold
    .forEach((item) => productsService.increaseQuantity(item.productId, item.quantity));
  return await Sales.remove(id);
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove
};