const { getProductById } = require('../models/productsModel');

const minQuantityLeftInStock = 0;

const findProduct = async (id) => await getProductById(id);

const stockChecker = async (req, res, next) => {
  const id = req.params;
  const itensSold = req.body;
  itensSold.some(async (sale) => {
    const product = await findProduct(id);
    if (product.quantity - sale.quantity < minQuantityLeftInStock) {
      return res.status(NOT_FOUND).json(message);
    }
  });
  next();
};

module.exports = stockChecker;
