const UNPROCESSABLE_ENTITY = 422;
const nameLength = 5;
const ZERO = 0;

const validateNewProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  if (name.length < nameLength) {
    return res.status(UNPROCESSABLE_ENTITY)
      .json({err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      } });
  }
  if (quantity <= ZERO) {
    return res.status(UNPROCESSABLE_ENTITY)
      .json({err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      } });
  }
  if (typeof quantity !== 'number') {
    return res.status(UNPROCESSABLE_ENTITY)
      .json({err: { 
        code: 'invalid_data',  
        message: '"quantity" must be a number' 
      } });
  }
  next();
};

module.exports = {
  validateNewProduct,
};
