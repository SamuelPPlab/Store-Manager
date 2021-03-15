const rescue = require('express-rescue');
const productService = require('../services/productService');
const { status, errors } = require('../utils/status');
const { throwError } = require('../utils/errorHandler');
const { response } = require('express');

const createProduct = rescue(async (request, response) => {
  const { body } = request;

  const createdProduct = await productService.createProduct(body);

  response.status(status.created).json(createdProduct);
});

const getAllProducts = async (request, response) => {
  const allProducts = await productService.getAllProducts();

  response.status(status.ok).json(allProducts);
};

const getProductById = rescue(async (request, response) => {
  const { id } = request.params;

  const product = await productService.getProductById(id);

  response.status(status.ok).json(product);
});

const updateProduct = rescue(async (request, response) => {
  const { id } = request.params;
  const { name, quantity } = request.body;

  const updatedProduct = await productService.updateProduct(id, name, quantity);

  response.status(status.ok).json(updatedProduct);
});

const deleteProduct = rescue(async (req, res) => {
  const { id } = req.params;

  const getProduct = await productService.getProductById(id);

  if (!getProduct) throw new throwError(status.unprocessableEntity, errors.wrongId);

  await productService.deleteProduct(id);

  const { name, quantity } = getProduct;

  const deletedProduct = {
    _id: id,
    name,
    quantity,
  };

  res.status(status.ok).json(deletedProduct);
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
