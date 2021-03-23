const UNPROCESSABLE_ENTITY = 422;
const NUMBER_MIN_LENGTH = 1;

const validateQuantity = async (req, res, next) => {
  const { quantity } = req.body;
  if (quantity < NUMBER_MIN_LENGTH) {
    return res
      .status(UNPROCESSABLE_ENTITY)
      .json({ message: 'quantity must be larger than or equal to 1' });
  }
  if (typeof quantity === 'string' ) {
    return res
      .status(UNPROCESSABLE_ENTITY)
      .json({ message: 'quantity must be a number' });
  }
  next();
};

module.exports = validateQuantity;