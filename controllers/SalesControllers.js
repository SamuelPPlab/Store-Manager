const { Router } = require('express');
const rescue = require('express-rescue');
const Sales = require('../models/Sales');
const Products = require('../models/Products');
const salesValidation = require('../schemas/salesValidation');

const router = new Router();

const OK = 200;
const NOT_FOUND = 404;
const ERROR = 422;

const ERROR_MESSAGE = {
  err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
};

const SALE_NOT_FOUND = {
  err: { code: 'not_found', message: 'Sale not found' },
};

const SALE_NOT_REMOVED = {
  err: { code: 'invalid_data', message: 'Wrong sale ID format' },
};

router.post('/', salesValidation, async (req, res) => {
  try {
    const products = req.body;

    products.forEach(async (product) => {
      const { productId } = product;

      const productExists = await Products.findById(productId);

      if (!productExists) {
        return res.status(ERROR).json(ERROR_MESSAGE);
      }
    });

    const createdSale = await Sales.create(products);

    return res.status(OK).json(createdSale);
  } catch (err) {
    return res.status(ERROR).json(ERROR_MESSAGE);
  }
});

router.get('/', rescue(async (req, res) => {
  const fetchedSale = await Sales.getAll();

  return res.status(OK).json({ sales: fetchedSale });
}));

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const fetchedSale = await Sales.findById(id);

    if (!fetchedSale) {
      return res.status(NOT_FOUND).json(SALE_NOT_FOUND);
    }

    return res.status(OK).json(fetchedSale);
  } catch (err) {
    return res.status(NOT_FOUND).json(SALE_NOT_FOUND);
  }
});

router.put('/:id', salesValidation, async (req, res) => {
  try {
    const { id } = req.params;
    const products = req.body;

    await Sales.update(id, products);
    const modifiedSale = await Sales.findById(id);

    return res.status(OK).json(modifiedSale);
  } catch (err) {
    return res.status(ERROR).json(ERROR_MESSAGE);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const saleToRemove = await Sales.findById(id);

    if (!saleToRemove) {
      return res.status(ERROR).json(SALE_NOT_REMOVED);
    }

    await Sales.remove(id);
    return res.status(OK).json(saleToRemove);
  } catch (err) {
    return res.status(ERROR).json(SALE_NOT_REMOVED);
  }
});

module.exports = router;
