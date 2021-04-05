const { ObjectId } = require('mongodb');
const { getProduct } = require('../models/productModel');
const { getSales, getById, editSalesDb, deleteSalesDb } = require('../models/saleModel');

const MIN_QUANTITY = 0;
const UNPROCESSABLE = 422;
const NOT_FOUND = 404;

const getAllSales = async () => await getSales();
const getSaleById = async (id) => await getById(id);
const editSales = async (id, data) => await editSalesDb(id, data);
const deleteSale = async (id) => await deleteSalesDb(id);

const validateSaleQuantity = async (req, res, next) => {
  req.body.forEach((item) => {
    const { quantity } = item;
    if (!quantity || quantity <= MIN_QUANTITY || typeof quantity !== 'number') {
      return res.status(UNPROCESSABLE).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity'
        }
      });
    }
  });
  next();
};

const validateProductId = async (req, res, next) => {
  req.body.forEach( async (item) => {
    const { productId } = item;
    const product = await getProduct(productId);
    if (!ObjectId.isValid(productId) || !product) {
      return res.status(twoHundredTwentyTwo).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity'
        }
      });
    }
  });

  next();
};

const validateSaleId = async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(NOT_FOUND).json({
    err:{
      code: 'not_found',
      message: 'Sale not found',
    }
  });
  next();
};

const validateDeleteId = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(UNPROCESSABLE).json({
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    }
  });

  next();
};

module.exports = {
  validateSaleQuantity,
  validateProductId,
  validateSaleId,
  getAllSales,
  validateDeleteId,
  getSaleById,
  editSales,
  deleteSale,
};
