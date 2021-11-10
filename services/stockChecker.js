const { getProductById } = require('../models/productsModel');
const salesValidator = require('./salesValidator');

const minQuantityLeftInStock = 0;
const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;

const message = {
  err: {
    code: 'stock_problem',
    message: 'Such amount is not permitted to sell',
  },
};

const needToSellMore = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  },
};

const findProduct = async (id) => {
  return await getProductById(id);
};

const stockChecker = async (req, res, next) => {
  const itensSold = req.body;
  const areSalesValid = salesValidator(itensSold);
  if (typeof areSalesValid !== 'string') {
    return res.status(areSalesValid.status).json(areSalesValid.error);
  }
  const checkingSaleQuantity = itensSold.some((sale) => {
    return (
      sale.quantity <= minQuantityLeftInStock 
    );
  });
  if (checkingSaleQuantity) {
    return res.status(UNPROCESSABLE_ENTITY).json(needToSellMore);
  }
  const checkingStockAvailability = itensSold.map(async (sale) => {
    const product = await findProduct(sale.productId);
    const stockDifference = product.quantity - sale.quantity;
    return (
      stockDifference <= minQuantityLeftInStock
    );
  });
  const resolvedPromises = await Promise.all(checkingStockAvailability);
  const isDataValid = resolvedPromises.some((item) => (item === true));
  if (isDataValid) {
    return res.status(NOT_FOUND).json(message);
  }
  next();
};

module.exports = stockChecker;
