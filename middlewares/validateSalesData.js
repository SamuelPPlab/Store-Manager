const ZERO = 0;
const UNPROCESSABLE_ENTITY = 422;


const validateSales = async (req, res, next) => {
  const products = req.body;
  const quantity = products.map((product) => product.quantity);
  const isNotValid = quantity.some((item) => item <= ZERO || typeof item !== 'number');
  if (isNotValid) {
    return res.status(UNPROCESSABLE_ENTITY)
      .json({err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      } });
  }
  next();
};

module.exports = {
  validateSales,
};
