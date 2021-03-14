const products = require('../models/modelProduct');

const serviceInsertProduct = async ({ name, quantity }) => {
  return await products.insertProduct(name, quantity);
};

const serviceFindProduct = async (name) => {
  return await products.findProduct(name);
};

const serviceGetAllProducts = async () => {
  return await products.getAllProducts();
};

module.exports = {
  serviceInsertProduct,
  serviceFindProduct,
  serviceGetAllProducts,
};