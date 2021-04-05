const { Router } = require('express');
const productsServices = require('../services/productsServices');
const validateName = require('../middleware/nameValidation');
const validateQuantity = require('../middleware/quantityValidation');
const nameExist = require('../middleware/nameExist');
const validateId = require('../middleware/idValidation');
// const validateId = require('../middleware/idValidation');

const router = Router();
const CREATED = 201;
const OK = 200;


router.get('/', async (_req, res) => {
  const products = await productsServices.getAllProducts();
  
  res.status(OK).json({products});
});

router.get('/:id', validateId, async (req, res) => {
  const foundId = await productsServices.findProductsById(req.params.id);

  res.status(OK).json(foundId);
});

router.post('/', validateName, nameExist, validateQuantity, async (req, res) => {
  const { name, quantity } = req.body;
  const { insertedId } = await productsServices.createProduct(name, quantity);

  const newProduct = {
    _id: insertedId,
    name,
    quantity,
  };

  res.status(CREATED).json(newProduct);
});

router.put('/:id', validateName, validateQuantity, async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const productUpdate = await productsServices.updateProducts(id, name, quantity);

  res.status(OK).json(productUpdate);
  
});

router.delete('/:id', validateId, async (req, res) => {
  const { id } = req.params;

  const foundId = await productsServices.findProductsById(id);

  await productsServices.deleteProducts(id);

  res.status(OK).send(foundId);
});

module.exports = router;
