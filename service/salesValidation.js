module.exports = async (req, res, next) => {
  const products = await  req.body;

  const ERROR = 422;

  products.forEach((product) => {
    const { quantity } = product;

    if (quantity < 1 || !quantity || typeof quantity !== 'number') {
      return res.status(ERROR).json({
        err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
      });
    }
  });

  next();
};
