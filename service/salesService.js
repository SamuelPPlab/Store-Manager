const MIN_QUANTITY = 0;
const UNPROCESSABLE = 422;

const validateQuantity = async (req, res, next) => {
  const { quantity } = req.body;
  if (!quantity || quantity <= MIN_QUANTITY) {
    return res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    });
  }
  if (typeof quantity !== 'number'){
    return res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    });
  }
  next();
};

module.exports = { validateQuantity };
