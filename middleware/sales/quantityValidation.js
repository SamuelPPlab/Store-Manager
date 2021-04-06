const UNPROCESSABLE_ENTITY = 422;
const ZERO = 0;

const validateQuantity = async (req, res, next) => {
  const quantitySales = req.body;
  quantitySales.map((item) => {
    if (!item.quantity || item.quantity <= ZERO) {
      return res.status(UNPROCESSABLE_ENTITY).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      });
    }
    if (typeof item.quantity === 'string') {
      return res.status(UNPROCESSABLE_ENTITY).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      });
    }
  });
  next();
};

module.exports = validateQuantity;
