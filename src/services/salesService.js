const { ObjectId } = require('mongodb');
const product = require('../models/productModels');
const { getByIdSales } = require('../models/salesModels');

const UNPROCESSABLE_ENTITY = 422;
const NOT_FOUND = 404;
const one = 1;
const zero = 0;

async function setValidation (req, res, next) {
  const sale = req.body;
  sale.forEach((element) => {
    if(element.quantity < one || typeof element.quantity !== 'number') {
      return res.status(UNPROCESSABLE_ENTITY).json({
        err:{
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        }
      });
    };
  });
  next();
};

async function setValidationID (req, res, next) {
  const { id } = req.params || null;
  if (!ObjectId.isValid(id)) return res.status(NOT_FOUND).json(
    {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    }
  );
  next();
};

const setValidationUpdate = async (req, res, next) => {
  const [{ productId, quantity }] = req.body;
  const item = await product.getById(productId);
  const newStockQuantity = (item.quantity - quantity);
  if (newStockQuantity < zero){
    return res.status(NOT_FOUND).json({
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell'
      }
    });
  };
  await product.update(item._id, item.name, newStockQuantity);

  next();
};

const setValidationStock = async (req, res, next) => {
  const { id } = req.params;
  const sales = await getByIdSales(id);
  const { productId, quantity } = sales.itensSold['0'];
  const item = await product.getById(productId);
  const newStockQuantity = (item.quantity + quantity);
  await product.update(item._id, item.name, newStockQuantity);

  next();
};

module.exports = {
  setValidation,
  setValidationID,
  setValidationUpdate,
  setValidationStock,
};
