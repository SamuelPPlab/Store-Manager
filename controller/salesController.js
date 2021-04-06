const { Router } = require('express');
const salesServices = require('../services/salesServices');
const quantityValidation = require('../middleware/sales/quantityValidation');
const validateId = require('../middleware/sales/idValidation');
const deleteId = require('../middleware/sales/deleteSale');
const salesValidation = require('../middleware/sales/salesValidation');

const router = Router();
const OK = 200;

router.get('/', async (_req, res) => {
  const sales = await salesServices.getAllSales();

  res.status(OK).json({ sales });
});

router.post('/', quantityValidation, salesValidation, async (req, res) => {
  const sales = req.body;
  const newSales = await salesServices.createSales(sales);

  res.status(OK).json(newSales);
});

router.get('/:id', validateId, async (req, res) => {
  const foundId = await salesServices.findSalesById(req.params.id);

  res.status(OK).json(foundId);
});

router.put('/:id', quantityValidation, async (req, res) => {
  const { id } = req.params;
  const { itensSold } = req.body;

  await salesServices.updateSales(id, itensSold);

  const editedSale = {
    _id: id,
    itensSold: req.body,
  };

  res.status(OK).json(editedSale);
});

router.delete('/:id', deleteId, async (req, res) => {
  const { id } = req.params;

  const foundId = await salesServices.findSalesById(id);

  await salesServices.deleteSales(id);

  res.status(OK).send(foundId);
});

module.exports = router;
