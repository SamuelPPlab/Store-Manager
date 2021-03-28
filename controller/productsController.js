const { Router } = require('express');
const productsServices = require('../services/productsServices');
const validateName = require('../middleware/nameValidation');
const validateQuantity = require('../middleware/quantityValidation');

const router = Router();
const CREATED = 201;
const OK = 200;

router.get('/', async (req, res) => {
  const foundAll = await productsServices.getAllProducts();

  res.status(OK).json({foundAll});
});

router.get('/', async (req, res) => {
  const { id } = req.body;
  const foundId = await productsServices.findProductsById(id);

  res.status(OK).json({foundId});
});

router.post('/', validateName, validateQuantity, async (req, res) => {
  const { name, quantity } = req.body;
  const { insertedId } = await productsServices.createProduct(name, quantity);

  const newProduct = {
    _id: insertedId,
    name,
    quantity,
  };

  res.status(CREATED).json(newProduct);
});

module.exports = router;
