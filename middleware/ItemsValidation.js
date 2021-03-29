const ProductsModel = require('../models/ProductsModel');
const UNPROCESSABLE_ENTITY = 422, ZERO = 0;

const itemValidation = async (req, res, next) => {
  const itensSold = req.body;
  const checkBadData = await itensSold.some(async(item) => {
    const product = await ProductsModel.getById(item.productId);
    return (!product || item.quantity <= ZERO || typeof item.quantity !== 'number');
  });
  console.log(checkBadData, 'v');
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