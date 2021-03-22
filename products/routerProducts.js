const express = require('express');
const productsController = require('./productsController');

const routerProducts = express.Router();

routerProducts.use(express.json());

routerProducts.post('/', productsController.createProduct);

module.exports = routerProducts;
