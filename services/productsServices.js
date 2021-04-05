const Products = require('../models/productsModel');

const getAllProducts = async() => {
  const foundAll = await Products.getAllProducts();

  return foundAll;
};

const findProductByName = async(name) => {
  const foundName = await Products.findProductsByName(name);

  return foundName;
};

const findProductsById = async(id) => {
  const foundId = await Products.findProductsById(id);

  return foundId;
};

const createProduct = async(name, quantity) => {
  const newProduct = await Products.createProducts(name, quantity);
  
  return newProduct;
};

const updateProducts = async(id, name, quantity) => {
  const productUpdate = await Products.updateProducts(id, name, quantity);
  
  return productUpdate;
};

const deleteProducts = async(id) => {
  const productsDelete = await Products.deleteProducts(id);
  
  return productsDelete;
};

module.exports = {
  getAllProducts,
  findProductByName,
  findProductsById,
  createProduct,
  updateProducts,
  deleteProducts,
};
