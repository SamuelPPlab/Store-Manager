const rescue = require('express-rescue');
const { status, errors, codeStatus } = require('../schemas/status');

const validateCreatedSale = rescue((req, res, next) => {
  const itensSold = req.body;

  const minValue = 0;
  const idLength = 24;
 
  const verifyQuantity = itensSold.every((item) => {
    if ( item.quantity === '' ||
      item.quantity <= minValue ||
      typeof item.quantity !== 'number'
    ) return false;
    return true;
  });

  const verifyProductId = itensSold.every((item) => {
    if ( item.productId === '' ||
      item.productId.length !== idLength ||
      typeof item.productId !== 'string'
    ) return false;
    return true;
  });

  if (!verifyQuantity || !verifyProductId ) return res.status(status.unprocessableEntity)
    .json({ err: { code: codeStatus.invalidData, message: errors.wrongIdOrQuantity } });

  next();
});

module.exports = {
  validateCreatedSale,
};
