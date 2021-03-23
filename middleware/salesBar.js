const {
  serviceInsertSales,
  serviceGetAllSales,
  serviceGetSaleById,
  servicePutSaleById,
  serviceDeleteSaleById,
} = require('../service/serviceSales');
const {
  serviceDecIncProductById,
} = require('../service/serviceProduct');

const SUCCESS = 200;
const SUCCESS_INSERTED = 201;
const UNPROCESSABLE = 422;
const NOT_FOUND = 404;
const codeType = 'invalid_data';

const {
  validateId,
  validateQuantityType,
  validateQuantitylargeThanZero,
} = require('../controllers/validate/validate');

const postBar = async (req, res) => {
  const { productId, quantity } = req.body[0];
  const valId = validateId;
  const valQuantLarge = validateQuantitylargeThanZero;
  const valQuantType = validateQuantityType;
  if (
    valId(productId) === false
    || valQuantLarge(quantity) === false
    || valQuantType(quantity) ===false
  ) {
    return res.status(UNPROCESSABLE).json({
      err: {
        code: codeType,
        message: 'Wrong product ID or invalid quantity',
      }
    });
  } else {
    const { ops } = await serviceInsertSales(req.body);
    await serviceDecIncProductById(productId, - quantity);
    return res.status(SUCCESS).json(ops[0]);
  } 
};

const getBar = async (_req, res) => {
  const list = await serviceGetAllSales();
  return res.status(SUCCESS).json({ sales: list });
};

const getBarId = async (req, res) => {
  const { id } = req.params;
  if (validateId(id) === false) {
    return res.status(NOT_FOUND).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      }
    });
  }
  const sale = await serviceGetSaleById(id);
  if (sale === null) {
    return res.status(NOT_FOUND).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      }
    });
  }
  return res.status(SUCCESS).json(sale);

};

const putBarId = async (req, res) => {
  const { id } = req.params;
  const itensSolds = req.body;
  const valId = validateId(id);
  const valQuantLarge = validateQuantitylargeThanZero;
  const valQuantType = validateQuantityType;
  let saleId;
  let quantity;
  itensSolds.forEach(async (element) => {
    saleId = element.productId;
    quantity = element.quantity;
    await serviceDecIncProductById(saleId, quantity);
  });
  if (
    valId === false
    || valQuantLarge(quantity) === false
    || valQuantType(quantity) === false
  ) {
    res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      }
    });
  } else {
    const sales = await servicePutSaleById(id, itensSolds);
    console.log(quantity);
    return res.status(SUCCESS).json(sales);
  };
};

const deleteBarId = async (req, res) => {
  const { id } = req.params;
  const valId = validateId(id);
  
  if (valId === false) {
    return res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      }
    });
  } 
  const sale = await serviceGetSaleById(id);
  if (sale === null || sale === {}) {
    return res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      }
    });
  }
  sale.itensSold.forEach(async (prod) => {
    await serviceDecIncProductById(prod.productId, prod.quantity);
  });
  await serviceDeleteSaleById(id);
  return res.status(SUCCESS).json(sale);
};

module.exports = {
  putBarId,
  getBarId,
  postBar,
  getBar,
  deleteBarId,
};