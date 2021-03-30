const Store = require('../models/store');
const { ObjectId } = require('mongodb');

//Product
const createProduct = async (product) => {
  return await Store.createProduct(product);
};

const ProductList = async () => {
  return await Store.ProductList();
};

const findById = async (id) => {
  return await Store.findById(id);
};
const update = async (id, name, quantity) => {
  return await Store.update(id, name, quantity);

};
const remove = async (id) => {
  return await Store.remove(id);
};

//Sales
const salesList = async () => {
  return await Store.salesList();
};
const createSales = async (products) => {
  return await Store.createSales(products);
};
const findSalesById = async (Sales) => {
  return await Store.findSalesById(Sales);
};
const saleUpdate = async (id, products) => {
  return await Store.saleUpdate(id, products);
};
const salesRemove = async (id) => {
  return await Store.salesRemove(id);;
};

module.exports = {
  createProduct,
  ProductList,
  findById,
  update,
  remove,
  salesList,
  createSales,
  findSalesById,
  saleUpdate,
  salesRemove
};
