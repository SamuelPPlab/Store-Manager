module.exports = {
  productValidation: (req, res, next) => {
    const { name, quantity } = req.body;

    const ERROR = 422;
    const CINCO = 5;

    if (name.length < CINCO) {
      return res.status(ERROR).json({
        err: {
          code: 'invalid_data',
          message: '"name" length must be at least 5 characters long',
        },
      });
    }
    if (typeof quantity !== 'number') {
      return res.status(ERROR).json({
        err: { code: 'invalid_data', message: '"quantity" must be a number' }
      });
    }
    if (quantity < 1) {
      return res.status(ERROR).json({
        err: {
          code: 'invalid_data',
          message: '"quantity" must be larger than or equal to 1',
        },
      });
    }

    next();
  }
};
