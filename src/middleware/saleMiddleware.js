const rescue = require('express-rescue');

const { status, errors, codeStatus } = require('../schemas/status');
const ProductServices = require('../services/productService');

const validateCreatedSale = rescue(async (req, res, next) => {
  const itensSold = req.body;

  const minValue = 0;
  const idLength = 24;
 
  itensSold.map(async (item) => {
    if ( item.quantity === '' ||
      item.quantity <= minValue ||
      typeof item.quantity !== 'number'
    ) return res.status(status.unprocessableEntity)
      .json({ err: { code: codeStatus.invalidData, message: errors.wrongIdOrQuantity } });

    if ( item.productId === '' ||
      item.productId.length !== idLength ||
      typeof item.productId !== 'string'
    ) return res.status(status.unprocessableEntity)
      .json({ err: { code: codeStatus.invalidData, message: errors.wrongIdOrQuantity } });

    const product = await ProductServices.findProductById(item.productId);
    const newQuantity = product.quantity - item.quantity;
    if (newQuantity < minValue) return res.status(status.notFound).json(
      { err: { code: codeStatus.stockProblem, message: errors.amountNotPermitted } }
    );
  });

  next();
});

module.exports = {
  validateCreatedSale,
};
