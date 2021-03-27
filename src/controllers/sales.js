const { Router } = require('express');
const { ObjectId } = require('mongodb');
const {
  getAllSales,
  createSales,
  getByIdSales,
  updateSales,
  destroySales,

} = require('../models/salesModels');
const { setValidation, setValidationID, setValidationStock,   setValidationUpdate,
} = require('../services/salesService');

const sales = new Router();

const SUCCESS = 200;
const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;

sales.get(
  '/sales', async (_req, res) => {
    const salesList = await getAllSales();
    return res.status(SUCCESS).send({sales: salesList});
  });

sales.get(
  '/sales/:id', setValidationID, async (req, res) => {
    const { id } = req.params;
    const salesID = await getByIdSales(id);
    if (!salesID) return res.status(NOT_FOUND ).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
    return res.status(SUCCESS).send(salesID);
  });

sales.post(
  '/sales', setValidation,   setValidationUpdate
  , async (req, res) => {
    const newSale = await createSales(req.body);
    res.status(SUCCESS).json(newSale);
  }
);

sales.put(
  '/sales/:id', setValidationID, setValidation, async (req, res) => {
    const { id } = req.params;
    await updateSales(id, req.body);
    const updatedSales = await getByIdSales(id);
    return res.status(SUCCESS).send(updatedSales);
  });

sales.delete(
  '/sales/:id', setValidationStock, async (req, res) => {
    const { id } = req.params;
    try{
      const destroyedSales = await destroySales(id);
      return res.status(SUCCESS).json(destroyedSales);
    } catch (error){
      res.status(UNPROCESSABLE_ENTITY).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong sale ID format',
        },
      });
    }
  });


module.exports = { sales };
