const salesService = require('./salesService');

const ERROR = 422;

const createSale = async (req, res) => {
  console.log('controller - sale');

  const sales = req.body;

  const { CREATED, createdSale, err } = await
  salesService.createSale(sales);

  if (err) return res.status(ERROR).json({err});

  res.status(CREATED).json(createdSale);
};

module.exports = {
  createSale,
};
