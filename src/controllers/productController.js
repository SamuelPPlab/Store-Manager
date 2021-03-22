const express = require('express');

const { status } = require('../schemas/status');
const ProductService = require('../services/productService');
const {
  validateName,
  validateQuantity,
  validateId 
} = require('../middleware/productMiddleware');

const routes = express.Router();

// Criação do produto
routes.post('/', validateName, validateQuantity, async (req, res) => {
  const { name, quantity } = req.body;

  const createdProduct = await ProductService.createProduct(name, quantity);

  if(createdProduct.isError) return res.status(createdProduct.status)
    .json({ err: { code: createdProduct.code, message: createdProduct.message }});

  return res.status(status.created).json(createdProduct);
});

// Lista todos os produtos
routes.get('/' , async (_req, res) => {
  const allProducts = await ProductService.getAllProducts();

  return res.status(status.success).send(allProducts);
});

// Lista produtos por ID
routes.get('/:id', validateId, async (req, res) => {
  const { id } = req.params;

  const productById = await ProductService.findProductById(id);

  return res.status(status.success).send(productById);
});

// Atualizar produto por ID
routes.put('/:id', validateName, validateQuantity, validateId, async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  await ProductService.updateProduct(id, name, quantity);

  return res.status(status.success).send({ _id: id, name, quantity });
});

// Remover produto
routes.delete('/:id', validateId, async (req, res) => {
  const { id } = req.params;

  const productById = await ProductService.findProductById(id);
  
  await ProductService.deleteProduct(id);

  return res.status(status.success).send(productById);
});

module.exports = routes;
