const { Router } = require('express');
const {
  createSale,
  findById,
  getSales,
  updateSale,
  deleteSale } = require('../services/salesServices');
const validateSales = require('../middlewares/validateSales');
const updateProductQuantity = require('../middlewares/updateProductQuantity');

const router = Router();

const SUCCESS = 200;
const CREATED = 201;
const DFT_ERROR = 400;
const NOT_FOUND = 404;
const UNPROCESSABLE = 422;
const zero = 0;

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const findSale = await findById(id);

    if (!findSale) return res.status(NOT_FOUND).send({
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }
    });

    res.status(SUCCESS).send(findSale);
  } catch(e) {
    console.log(e);
  }
});

router.get('/', async (_req, res) => {
  try {
    const sales = await getSales();

    res.status(SUCCESS).send({ sales });
  } catch(e) {
    res.status(DFT_ERROR).send({
      err: 'invalid_data',
      message: 'Something went awry.'
    });
  }
});

router.post('/', validateSales, updateProductQuantity, async (req, res) => {
  try {
    const salesArray = [...req.body];
    const newSale = await createSale(salesArray);

    return res.status(SUCCESS).send(newSale);
  } catch(e) {
    console.log(e);
  }
});

router.put('/:id', validateSales, updateProductQuantity, async (req, res) => {
  try {
    const salesArray = [...req.body];
    const { id } = req.params;
    const updatedSale = await updateSale({ id, itensSold: salesArray });

    res.status(SUCCESS).send(updatedSale);
  } catch(e) {
    console.log(e);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const findSale = await findById(id);

    if (findSale === false) return res.status(UNPROCESSABLE).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format'
      }
    });

    const deletedCount = await deleteSale(id);
    if (!deletedCount || deletedCount === zero) return res.status(NOT_FOUND).send({
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }
    });

    return res.status(SUCCESS).send(findSale);
  } catch(e) {
    console.log(e);
    res.status(DFT_ERROR).send(e);
  }
});

module.exports = router;
