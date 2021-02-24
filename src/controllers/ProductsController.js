const ProductsServices = require('../services/ProductsServices');
const rescue = require('express-rescue');
const {status, errorMessages} = require('../errorHandler/utils/status');
const { response } = require('express');
const { throwError } = require('../errorHandler/errorHandler');


const registerProduct = rescue(async (req, res) => {
  const { body } = req;
  const responsePayload = await ProductsServices.registerProduct(body);

  res.status(status.created).json(responsePayload);
});

const getAll = async (req, res) => {
  const responsePayload = await ProductsServices.getAll();
  res.status(status.ok).json(responsePayload);
};

const getById = rescue(async (req, res) => {
  const {id} = req.params;

  const responsePayload = await ProductsServices.findById(id);

  res.status(status.ok).json(responsePayload);
});

const updateProducts = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  const responsePayload = await ProductsServices.updateProduct(name, quantity, id);

  res.status(status.ok).json(responsePayload);
};

const deleteProduct = rescue(async (req, res) => {
  const { id } = req.params;

  const hasProduct = await ProductsServices.findById(id);

  if(!hasProduct) throw new throwError(status.unprocessableEntity, errorMessages.wrongId);

  await ProductsServices.deleteProduct(id);

  const {name, quantity} = hasProduct;

  const responsePayload = {
    _id: id,
    name,
    quantity
  };

  res.status(status.ok).json(responsePayload);
});

module.exports = {
  registerProduct,
  getAll,
  getById,
  updateProducts,
  deleteProduct
};