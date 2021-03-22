const { Router } = require('express');
const rescue = require('express-rescue');
const Products = require('../models/Products');
const { productValidation } = require('../schemas/productValidation');

const router = new Router();

const ERROR = 422;
const SUCCESS = 201;
const OK = 200;

const ERROR_MESSAGE = {
  err: { code: 'invalid_data', message: 'Wrong id format' },
};

router.post('/', productValidation, rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const data = await Products.getByName(name);

  if(data) {
    return res.status(ERROR).json({
      err: { code: 'invalid_data', message: 'Product already exists' }
    });
  }

  await Products.create(name, quantity);
  const productInserted = await Products.getByName(name);
  return res.status(SUCCESS).json(productInserted);
}));

router.get('/', rescue(async (_req, res) => {
  const fetchedProduct = await Products.getAll();

  return res.status(OK).json({ products: fetchedProduct });
}));

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
  
    const fetchedProduct = await Products.findById(id);

    if (!fetchedProduct) {
      return res.status(ERROR).json(ERROR_MESSAGE);
    }

    return res.status(OK).json(fetchedProduct);
  } catch (err) {
    return res.status(ERROR).json(ERROR_MESSAGE);
  }
});

router.put('/:id', productValidation, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    await Products.update(id, name, quantity);
    const modifiedProduct = await Products.findById(id);

    return res.status(OK).json(modifiedProduct);
  } catch (err) {
    return res.status(ERROR).json(ERROR_MESSAGE);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const productToRemove = await Products.findById(id);

    if (!productToRemove) {
      return res.status(ERROR).json({
        err: { code: 'invalid_data', message: 'Wrong id format' }
      });
    }

    await Products.remove(id);
    return res.status(OK).json(productToRemove);
  } catch (err) {
    return res.status(ERROR).json(ERROR_MESSAGE);
  }
});

module.exports = router;
