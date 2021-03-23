const express = require('express');
const productsController = require('./productsController');

const routerProducts = express.Router();

routerProducts.use(express.json());

routerProducts.post('/', productsController.createProduct);

routerProducts.get('/', productsController.getAll);

routerProducts.get('/:id', productsController.findById);

routerProducts.put('/:id', productsController.updateProduct);

routerProducts.delete('/:id', productsController.deleteProduct);

module.exports = routerProducts;
