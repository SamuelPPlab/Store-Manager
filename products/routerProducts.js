const express = require('express');
const productsController = require('./productsController');

const routerProducts = express.Router();

routerProducts.use(express.json());

routerProducts.post('/', productsController.createProduct);

routerProducts.get('/', productsController.getAll);

routerProducts.get('/:id', productsController.findById);

module.exports = routerProducts;
