const { Router } = require('express');
const rescue = require('express-rescue');
const { ObjectId } = require('mongodb');

const router = Router();
const SalesService = require('../services/SalesService');
const { updateProductQuantity,
  updateDeletedSales
} = require('../middlewares/updateQuantity');
const { validateSales } = require('../middlewares/validateSalesData');
const UNPROCESSABLE_ENTITY = 422;
const NOT_FOUND = 404;
const SUCCESS = 200;

router.post('/sales', validateSales, updateProductQuantity, rescue (async (req, res) => {
  const products = req.body;
  const insertedId = await SalesService.registerSale(products);

  return res.status(SUCCESS).json({ _id:insertedId, itensSold:products });
}));

router.get('/sales', rescue (async (req, res) => {
  const allSales = await SalesService.getAll();
  res.status(SUCCESS).json({ sales:allSales });
}));

router.get('/sales/:id', rescue (async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(NOT_FOUND)
      .json({err: { 
        code: 'not_found',  
        message: 'Sale not found' 
      } });
  }

  const sale = await SalesService.getById(id);

  if (!sale) {
    return res.status(NOT_FOUND)
      .json({err: { 
        code: 'not_found',  
        message: 'Sale not found'
      } });
  }

  return res.status(SUCCESS).json(sale);
}));

router.put('/sales/:id',
  validateSales,
  updateProductQuantity,
  rescue (async (req, res) => {
    const { id } = req.params;
    const products = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(NOT_FOUND)
        .json({err: { 
          code: 'not_found',  
          message: 'Sale not found' 
        } });
    }

    await SalesService.updateSale(id, products);
    return res.status(SUCCESS).json({ _id:id, itensSold:products });
  }));

router.delete('/sales/:id', updateDeletedSales, rescue (async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(UNPROCESSABLE_ENTITY)
      .json({err: { 
        code: 'invalid_data',  
        message: 'Wrong sale ID format' 
      } });
  }

  const findSale = await SalesService.getById(id);

  if (!findSale) {
    return res.status(UNPROCESSABLE_ENTITY)
      .json({err: { 
        code: 'invalid_data',  
        message: 'Wrong sale ID format' 
      } });
  }

  await SalesService.deleteSale(id);
  res.status(SUCCESS).json(findSale);
}));

module.exports = router;
