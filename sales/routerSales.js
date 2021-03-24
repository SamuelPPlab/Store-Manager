const express = require('express');
const salesController = require('./salesController');

const routerSales = express.Router();

routerSales.use(express.json());

routerSales.post('/', salesController.createSale);

routerSales.get('/', salesController.getAllSales);

routerSales.get('/:id', salesController.findById);

module.exports = routerSales;
