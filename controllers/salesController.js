const salesService = require('../services/salesServices');
const productsService = require('../services/productsService');
const { SUCCESS, NOT_FOUND } = require('../dictionary/statusCode');
const { saleNotFound, WrongIdSaleFormat } = require('../dictionary/errorMessages');

const updateQuantity = async (itens, method) => {
  for await (const item of itens) {
    const { productId, name, quantity: saleQuantity } = item;
    let { _id, quantity } = await productsService.productById(productId);
      
    if (method === 'POST') quantity = quantity - saleQuantity;
    if (method === 'DELETE') quantity = quantity + saleQuantity;

    await productsService.updateProductInfo(_id, name, quantity);
  }
};

const createNewSale = async (req, res, next) => {
  const sale = req.body;
  const saleCreated = await salesService.createSale(sale);

  await updateQuantity(saleCreated.itensSold, req.method);

  return res.status(SUCCESS).json(saleCreated);
};

const getAll = async (req, res, next) => {
  const allSales = await salesService.allSales();

  return res.status(SUCCESS).json({ sales: allSales });
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const sale = await salesService.saleById(id);

  if (!sale) {
    return next({
      statusCode: NOT_FOUND,
      ...saleNotFound
    });
  }

  return res.status(SUCCESS).json(sale);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;

  const saleUpdated = await salesService.updateSaleInfo(id, sale);

  return res.status(SUCCESS).json(saleUpdated);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const deletedSale = await salesService.deleteSaleInfo(id);

  if (!deletedSale) {
    return next({
      statusCode: UNPROCESSABLE_ENTITY,
      ...WrongIdSaleFormat
    });
  }

  await updateQuantity(deletedSale.itensSold, req.method);

  return res.status(SUCCESS).json(deletedSale);
};

module.exports = {
  createNewSale,
  getAll,
  getById,
  updateSale,
  deleteSale
};