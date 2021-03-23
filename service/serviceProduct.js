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

const servicePutProductById = async (id, updProd) => {
  return await products.updateProduct(id, updProd);
};

const serviceDeleteProductById = async (id, delProd) => {
  return await products.deleteProduct(id, delProd);
};

const serviceDecIncProductById = async (id, quantity) => {
  return await products.decIncProduct(id, quantity);
};

module.exports = {
  serviceInsertProduct,
  serviceFindProduct,
  serviceGetAllProducts,
  serviceGetProductById,
  servicePutProductById,
  serviceDeleteProductById,
  serviceDecIncProductById,
};