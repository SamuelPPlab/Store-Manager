const { getProductById } = require('../models/productsModel');

const minQuantityLeftInStock = 0;
const NOT_FOUND = 404;

const message = {
  err: {
    code: 'stock_problem',
    message: 'Such amount is not permitted to sell',
  },
};

const findProduct = async (id) => await getProductById(id);

const stockChecker = async (req, res, next) => {
  const itensSold = req.body;
  itensSold.some(async (sale) => {
    const { productId } = sale;
    const product = await findProduct(productId);
    if (product.quantity - sale.quantity < minQuantityLeftInStock) {
      return res.status(NOT_FOUND).json(message);
    }
  });
  next();
};

module.exports = stockChecker;
