const Products = require('../models/productsModel');

const getAllProducts = async() => {
  const foundAll = await Products.getAllProducts();

  return foundAll;
};

const findProductByName = async(name) => {
  const foundName = await Products.findProductByName(name);

  return foundName;
};

const findProductsById = async(id) => {
  const foundId = await Products.findProductsById(id);

  return foundId;
}

const createProduct = async(name, quantity) => {
  const newProduct = await Products.createProducts(name, quantity);
  
  return newProduct;
};

module.exports = {
  getAllProducts,
  findProductByName,
  findProductsById,
  createProduct,
};
