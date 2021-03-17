const express = require('express');
const controllers = require('../controllers/sales');

const sales = express.Router();

sales.delete('/:id', controllers.deleteSale);

sales.get('/:id', controllers.getSales);
sales.get('/', controllers.getSales);

sales.post('/', controllers.createSale);

sales.put('/:id', controllers.updateSale);

module.exports = sales;
