const { Router } = require('express');
const { getAll, create, getById, update, destroy } = require('../models/productModels');
const { setValidation, setValidationID, ifExist } = require('../services/productService');

const products = new Router();

const SUCCESS = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTITY = 422;

products.post(
  '/products', setValidation, ifExist, async (req, res) => {
    await create(req.body);
    return res.status(CREATED).json(req.body);
  }
);

products.get(
  '/products', async (_req, res) => {
    const productsList = await getAll();
    return res.status(SUCCESS).send({products: productsList});
  });

products.get(
  '/products/:id', setValidationID, async (req, res) => {
    const { id } = req.params;
    const productID = await getById(id);
    if (!productID) return res.status(UNPROCESSABLE_ENTITY ).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
    return res.status(SUCCESS).send(productID);
  });

products.put(
  '/products/:id', setValidationID, setValidation, async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;
    await update(id, name, quantity);
    const updatedProduct = await getById(id);
    return res.status(SUCCESS).send(updatedProduct);
  });

products.delete(
  '/products/:id', setValidationID, async (req, res) => {
    const { id } = req.params;
    const destroyedProduct = await getById(id);
    if (!destroyedProduct) {
      return res.status(UNPROCESSABLE_ENTITY ).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      });
    };
    await destroy(id);
    return res.status(SUCCESS).send(destroyedProduct);
  });

module.exports = { products };
