const salesService = require('./salesService');

const ERROR = 422;
const OK = 200;
const NOT_FOUND = 404;

const createSale = async (req, res) => {
  console.log('controller - sale');

  const sales = req.body;

  const { CREATED, createdSale, err } = await
  salesService.createSale(sales);

  if (err) return res.status(ERROR).json({err});

  res.status(CREATED).json(createdSale);
};

const getAllSales = async (req, res) => {
  const allSales = await salesService.getAllSales();

  res.status(OK).json({sales: allSales});
};

const findById = async (req, res) => {
  const { id } = req.params;
  console.log('ID', id);

  const { productById, err } = await salesService.findById(id);

  if (err) return res.status(NOT_FOUND).json({err});

  res.status(OK).json(productById);
};

module.exports = {
  createSale,
  getAllSales,
  findById
};
