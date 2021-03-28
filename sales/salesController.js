const salesService = require('./salesService');

const ERROR = 422;
const OK = 200;
const NOT_FOUND = 404;

const createSale = async (req, res) => {
  console.log('controller - sale');

  const sales = req.body;

  const { CREATED, createdSale, err, statusCode } = await
  salesService.createSale(sales);

  if (statusCode) return res.status(NOT_FOUND).json({err});

  if (err) return res.status(ERROR).json({err});

  res.status(CREATED).json(createdSale);
};

const getAllSales = async (req, res) => {
  const allSales = await salesService.getAllSales();

  res.status(OK).json({sales: allSales});
};

const findById = async (req, res) => {
  const { id } = req.params;

  const { saleById, err } = await salesService.findById(id);

  if (err) return res.status(NOT_FOUND).json({err});

  res.status(OK).json(saleById);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const sales = req.body;

  const { UPDATED, updatedSale, err, statusCode } =
    await salesService.updateSale(id, sales);

  if (statusCode) return res.status(NOT_FOUND).json({err});

  if (err) return res.status(ERROR).json({err});

  res.status(UPDATED).json(updatedSale);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const { OK, saleById, err } = await salesService.deleteSale(id);

  if(err) return res.status(ERROR).json({err});

  res.status(OK).json(saleById);
};


module.exports = {
  createSale,
  getAllSales,
  findById,
  updateSale,
  deleteSale,
};
