const rescue = require('express-rescue');

const { status, errors, codeStatus } = require('../schemas/status');
const ProductServices = require('../services/productService');

const validateCreatedSale = rescue(async (req, res, next) => {
  const itensSold = req.body;

  const minValue = 0;
  const idLength = 24;

  const validatedQuantityAndProductId = itensSold.every((item) => {
    if ( item.quantity === '' ||
    item.quantity <= minValue ||
    typeof item.quantity !== 'number') return false;

    if ( item.productId === '' ||
      item.productId.length !== idLength ||
      typeof item.productId !== 'string') return false;

    return true;
  });

  if (!validatedQuantityAndProductId) return res.status(status.unprocessableEntity)
    .json({ err: { code: codeStatus.invalidData, message: errors.wrongIdOrQuantity } });

  const productArrayPromise = itensSold.map((item) => ProductServices
    .findProductById(item.productId));

  const products = await Promise.all(productArrayPromise);

  const isQuantityOk = products.every((product, index) => {
    const newQuantity = product.quantity - itensSold[index].quantity;
    if (newQuantity < minValue) return false;
    return true;
  });

  if (!isQuantityOk) return res.status(status.notFound).json(
    { err: { code: codeStatus.stockProblem, message: errors.amountNotPermitted } }
  );

  next();
});

module.exports = {
  validateCreatedSale,
};
