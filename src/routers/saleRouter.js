const { Router } = require('express');
const saleController = require('../controllers/saleController');
const saleService = require('../services/saleService');
const { validateCreateSale } = require('../utils/validationErrors');

const saleRouter = new Router();

saleRouter.post('/', validateCreateSale, saleController.createSale);

saleRouter.get('/', saleController.getAllSales);

saleRouter.get('/:id', saleController.getSaleById);

saleRouter.put('/:id', validateCreateSale, saleController.updateSale);

saleRouter.delete('/:id', saleController.deleteSale);

module.exports = saleRouter;
