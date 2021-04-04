const ProductsModel = require('../models/ProductsModel');
const UNPROCESSABLE_ENTITY = 422, ZERO = 0;

const itemValidation = (req, res, next) => {
  const itensSold = req.body;
  console.log('itemValidation');
  const checkBadData = itensSold.some((item) => 
    (item.quantity <= ZERO || typeof item.quantity !== 'number'));
  if (checkBadData) {
    const errorInfo = {
      message: 'Wrong product ID or invalid quantity',
      code: 'invalid_data'
    };
    return res.status(UNPROCESSABLE_ENTITY)
      .json({ err: errorInfo });
  }
  next();
};
module.exports = itemValidation;
