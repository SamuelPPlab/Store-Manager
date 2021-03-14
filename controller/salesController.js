const { Router } = require('express');
const { ObjectId } = require('mongodb');
const {
  newSale,
  findAllSales,
  findSale,
  updateSale,
  deleteSale
} = require('../service/salesServices');

const router = Router();
const SUCCESS = 200;
const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;
const INTERNAL_SERVER_ERROR = 500;

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
      err.code = 'invalid_data';
      err.message = 'Wrong product ID or invalid quantity';
      err.status = UNPROCESSABLE_ENTITY;
      return next(err);
    }
    const createSale = await newSale(bodyInitial);
    return res.status(SUCCESS).json(createSale);
  }
);

router.get('/', async (_req, res, _next) => {
  const sales = await findAllSales();
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
  if (!searchedId) {
    err.code = 'not_found';
    err.message = 'Sale not found';
    err.status = NOT_FOUND;
    return next(err);
  }
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
  await updateSale(id, dataToUpdate);
  const updateSaled = await findSale(id);
  return res.status(SUCCESS).json(updateSaled);  
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    err.code = 'invalid_data';
    err.message = 'Wrong sale ID format';
    err.status = UNPROCESSABLE_ENTITY;
    return next(err);
  }
  const storageSale = await findSale(id);
  if (storageSale) {
    await deleteSale(id);
    return res.status(SUCCESS).json(storageSale);
  }
  return res.status(INTERNAL_SERVER_ERROR);
});

module.exports = router;
