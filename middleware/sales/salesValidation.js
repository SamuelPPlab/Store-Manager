const Products = require('../../services/productsServices');

const NOT_FOUND = 404;

const validateQuantity = async (req, res, next) => {
  const quantitySales = req.body;
  const salesPromisse = quantitySales.map((item) => {
    return Products.findProductsById(item.productId);
  });

  const promissesResolve = await Promise.all(salesPromisse);

  const isOK = promissesResolve.every((item, index) => {
    return item.quantity >= quantitySales[index].quantity;
  });

  if (!isOK) {
    return res.status(NOT_FOUND).json({
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
      },
    });
  }

  next();
};

module.exports = validateQuantity;
