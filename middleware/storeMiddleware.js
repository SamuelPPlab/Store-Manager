const { findByName, update, findById, findSalesById } = require('../models/store');
const { ObjectId } = require('mongodb');

const validateCreate = async (req, res, next) => {
  const { name, quantity } = req.body;
  const nameArray = name.split('');
  const err = 422;
  const minimo = 5;
  const zero = 0;

  if (nameArray.length < minimo) return res.
    status(err).
    json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    });

  if (quantity <= zero) return res.
    status(err).
    json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    });
  if (typeof quantity !== 'number') return res.
    status(err).
    json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      }
    });

  next();
};
const checkQuantitySold = (req, res, next) => {
  const [{ quantity }] = req.body;
  const err = 422;
  const zero = 0;

  if (quantity <= zero || typeof quantity !== 'number') return res.
    status(err).
    json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    });
  next();
};

const nameExist = async (req, res, next) => {
  const { name } = req.body;
  const checkName = await findByName(name);
  const err = 422;
  const zero = 0;

  if (checkName > zero) return res.
    status(err).
    json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    });
  next();
};

const rightId = async (req, res, next) => {
  const { id } = req.params;
  const err = 422;
  if (!ObjectId.isValid(id)) {
    return res.status(err)
      .json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  }
  const check = await findById(id);
  if (!check) {
    return res.status(err)
      .json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  }
  next();
};
const salesId = async (req, res, next) => {
  const { id } = req.params;
  const err = 404;
  if (!ObjectId.isValid(id)) {
    return res.status(err)
      .json({ err: { code: 'not_found', message: 'Sale not found' } });
  }
  const check = await findSalesById(id);
  if (!check) {
    return res.status(err)
      .json({ err: { code: 'not_found', message: 'Sale not found' } });
  }
  next();
};
const rightIdSales = async (req, res, next) => {
  const { id } = req.params;
  const err = 422;
  if (!ObjectId.isValid(id)) {
    return res.status(err)
      .json({ err: { code: 'invalid_data', message: 'Wrong sale ID format' } });
  }
  const check = await findSalesById(id);
  if (!check) {
    return res.status(err)
      .json({ err: { code: 'invalid_data', message: 'Wrong sale ID format' } });
  }
  next();
};
const updateStock = async (req, res, next) => {
  const notFound = 404;
  const zero = 0;
  const [{ productId, quantity }] = req.body;
  const productIten = await findById(productId);
  const updateStock = (productIten.quantity - quantity);
  //console.log(productIten._id);
  if (updateStock < zero) return res
    .status(notFound).json({
      err:
        { code: 'stock_problem', message: 'Such amount is not permitted to sell' }
    });
  await update(productIten._id, productIten.name, updateStock);
  next();
};
const resetStock = async (req, res, next) => {
  const { id } = req.params;
  const sales = await findSalesById(id);
  const { productId, quantity } = sales.itensSold['0'];
  const productIten = await findById(productId);
  const reset = (productIten.quantity + quantity);
  await update(productIten._id, productIten.name, reset);
  next();
};

module.exports = {
  validateCreate,
  rightId,
  nameExist,
  checkQuantitySold,
  salesId,
  rightIdSales,
  updateStock,
  resetStock
};
