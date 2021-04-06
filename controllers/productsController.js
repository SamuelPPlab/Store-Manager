const { Router } = require('express');
const { createProduct, getAllProducts, getProductById,
  updateProduct, deleteProduct } = require('../models/productsModel');
const { productValidator, doesItExist } = require('../services/productValidator');
const idValidator = require('../services/idValidator');

const ProductsController = new Router();

const SUCCESS = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTITY = 422;

const wrongID = { 
  err: {
    code: 'invalid_data',
    message: 'Wrong id format',
  },
};

ProductsController.get('/', async (req, res) => {
  const products = await getAllProducts();
  res.status(SUCCESS).json({ products });
});

ProductsController.get('/:id', async (req, res) => {
  const { id } = req.params;
  const isIdValid = idValidator(id);
  if (!isIdValid) {
    return res.status(UNPROCESSABLE_ENTITY).json(wrongID);
  }
  const item = await getProductById(id);
  res.status(SUCCESS).json(item);
});

ProductsController.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const isDataValid = await productValidator(name, quantity);

  if (isDataValid !== 'Data is valid!') {
    return res.status(isDataValid.status).json(isDataValid.error);
  }

  await updateProduct(id, name, quantity);

  res.status(SUCCESS).json({ id, name, quantity });
});

ProductsController.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  const isDataValid = await productValidator(name, quantity);
  const doesExist = await doesItExist(name);

  if (isDataValid !== 'Data is valid!') {
    return res.status(isDataValid.status).json(isDataValid.error);
  }

  if (doesExist !== 'No!') {
    return res.status(doesExist.status).json(doesExist.error);
  }

  const { insertedId } = await createProduct(name, quantity);
  const response = { _id: insertedId, name, quantity };
  res.status(CREATED).json(response);
});

ProductsController.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const isIdValid = idValidator(id);
  if (!isIdValid) {
    return res.status(UNPROCESSABLE_ENTITY).json(wrongID);
  }
  const product = await getProductById(id);
  const deletedProduct = await deleteProduct(id);
  res.status(SUCCESS).json(product);
});

module.exports = ProductsController;
