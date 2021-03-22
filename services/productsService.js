const Products = require('../models/Products');
const productDataValidation = require('./productDataValidation');
const productIDValidation = require('./productIDValidation');
const productStockValidation = require('./productStockValidation');

const getAll = async () => {
  return await Products.getAll();
};

const findById = async (id) => {
  await productIDValidation(id);
  return await Products.findById(id);
};

const create = async (name, quantity) => {
  await productDataValidation(name, quantity);
  const product = await Products.create(name, quantity);
  return product;
};

const update = async (id, name, quantity) => {
  await productIDValidation(id);
  await productDataValidation(name, quantity);
  return await Products.update(id, name, quantity);
};

const remove = async (id) => {
  await productIDValidation(id);
  return await Products.remove(id);
};

const increaseQuantity = async (id, quantity) => {
  return await Products.increaseQuantity(id, quantity);
};

const decreaseQuantity = async (id, quantity) => {
  await productStockValidation(id, quantity);
  return await Products.decreaseQuantity(id, quantity);
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
  increaseQuantity,
  decreaseQuantity,
};