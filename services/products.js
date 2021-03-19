const productModel = require('../models/products');
const { throwError } = require('../utils/handleError');
const { status, errors } = require('../utils/setStatus');

const createProduct = async ({ name, quantity }) => {
  const product = await productModel.getByName(name);

  if (product) {
    throw new throwError(status.unprocessableEntity, errors.productExists);
  }

  const createdProduct = await productModel.createProduct(name, quantity);

  const result = {
    _id: createdProduct.insertedId,
    name,
    quantity,
  };

  return result;
};

const getAllProducts = async () => {
  const products = await productModel.getAllProducts();

  const allProducts = {
    products,
  };

  return allProducts;
};

const getProductById = async (id) => {
  const product = await productModel.getProductById(id);

  return product;
};

const updateProduct = async (id, name, quantity) => {
  await productModel.updateProduct(id, name, quantity);

  const updatedProduct = {
    _id: id,
    name,
    quantity,
  };

  return updatedProduct;
};

const deleteProduct = async (id) => {
  const deletedProduct = await productModel.deleteProduct(id);

  return deletedProduct;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
