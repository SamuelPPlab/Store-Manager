
const ProductsService = require('../services/ProductsService');
const UNPROCESSABLE_ENTITY = 422;

const validateDuplicated = async (req, res, next) => {
  const { name } = req.body;
  const productFound = await ProductsService.findProductByName(name);
  if (productFound !== null) {
    return res.status(UNPROCESSABLE_ENTITY)
      .json({err: { code: 'invalid_data', message: 'Product already exists' }});
  }
  next();
};

module.exports = {
  validateDuplicated,
};
