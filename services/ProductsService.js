const Products = require('../model/ProductsModel');

const getAll = async () => {
  return Products.getAll();
};

const getById = async (id) => {
  return Products.getById(id);
};

const findProductByName = async (name) => {
  return Products.findProductByName(name);
};

const createProduct = async (name, quantity) => {
  return Products.createProduct(name, quantity);
};

const updateProduct = async (id, productData) => {
  return Products.updateProduct(id, productData);
};

const deleteProduct = async (id) => {
  return Products.deleteProduct(id);
};

module.exports = {
  createProduct,
  getAll,
  getById,
  findProductByName,
  updateProduct,
  deleteProduct
};
