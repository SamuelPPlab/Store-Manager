const products = require('../models/modelProduct');

const serviceInsertProduct = async ({ name, quantity }) => {
  return await products.insertProduct(name, quantity);
};

const serviceFindProduct = async (name) => {
  return await products.findProductByName(name);
};

const serviceGetAllProducts = async () => {
  return await products.getAllProducts();
};

const serviceGetProductById = async (id) => {
  return await products.findProductById(id);
};

module.exports = {
  serviceInsertProduct,
  serviceFindProduct,
  serviceGetAllProducts,
  serviceGetProductById,
};