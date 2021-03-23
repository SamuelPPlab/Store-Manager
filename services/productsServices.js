const Products = require('../models/productsModel');

const getAllProducts = async() => {
  const foundAll = await Products.getAllProducts();

  return foundAll;
};

const createProduct = async(name, quantity) => {
  const newProduct = await Products.createProducts(name, quantity);

  return newProduct;
};

const findProductbyName = async(name) => {
  const foundName = await Products.findProductbyName(name);

  return foundName;
};

module.exports = {
  getAllProducts,
  createProduct,
  findProductbyName,
};
