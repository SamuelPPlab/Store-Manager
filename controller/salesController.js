const { Router } = require('express');
const { ObjectId } = require('mongodb');
const {
  newSale,
  findAllSales,
  saleUpdate,
  findSale
} = require('../service/SalesServices');

const router = Router();
const SUCCESS = 200;
const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;

const err = {
  code: '',
  status: 0,
  message: '',
};

router.post('/', 
  async (req, res, next) => {
    const bodyInitial = req.body;
    if (bodyInitial.some((item) => 
      typeof item.quantity === 'string' || item.quantity < 1)) {
      err.message = 'Wrong product ID or invalid quantity';
      err.status = UNPROCESSABLE_ENTITY;
      return next(err);
    }
    const createSale = await newSale(bodyInitial);
    return res.status(SUCCESS).json(createSale);
  }
);

router.get('/', async (_req, res, _next) => {
  const allSales = await findAllSales();
  const sales = allSales;
  return res.status(SUCCESS).json({sales});
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id) || !findSale(id)) {
    err.code = 'not_found';
    err.message = 'Sale not found';
    err.status = NOT_FOUND;
    return next(err);
  }
  const searchedId = await findSale(id);
  return res.status(SUCCESS).json(searchedId);
});

router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const dataToUpdate = req.body;
  if (dataToUpdate.some((item) => 
    typeof item.quantity === 'string' || item.quantity < 1)) {
    err.code = 'invalid_data';
    err.message = 'Wrong product ID or invalid quantity';
    err.status = UNPROCESSABLE_ENTITY;
    return next(err);
  };
  await saleUpdate(id, dataToUpdate);
  const saleUpdated = await findSale(id);
  return res.status(SUCCESS).json(saleUpdated);  
});

module.exports = router;