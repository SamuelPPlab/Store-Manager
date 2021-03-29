const { Router } = require('express');
const {
  validateName,
  createNewProduct,
  validateQuantity,
  getAllProductsService,
  getProductById,
  validateId,
  putProduct,
} = require('../service/productService');

const Product = new Router();
const SUCCESS = 200;
const CREATED = 201;

Product.post('/', validateName, validateQuantity, async (req, res) => {
  const product = { ...req.body };

  await createNewProduct(product);
  return res.status(CREATED).json(product);
});

Product.get('/', async (_req, res) => {
  const allProducts = await getAllProductsService();
  res.status(SUCCESS).json({ products: allProducts });
});

Product.get('/:id', validateId, async (req, res) => {
  const { id } = req.params;
  const product = await getProductById(id);

  return res.status(SUCCESS).json(product);
});

Product.put('/:id', validateName, validateQuantity, async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const obj = { id, name, quantity };

  await putProduct(obj);

  return res.status(SUCCESS).json(obj);
});

module.exports = { Product };
