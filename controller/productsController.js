const { Router } = require('express');

const {
  postProducts,
  getAllProducts,
  findById,
  deleteProduct,
  updateProduct
} = require('../models/storeModel');
const lastProductDatabase = require('../service/productServices');

const { validateNameProduct,
  validateProductQuantity,
  verifyNameProductExist
} = require('../service/productValidation');

const router = Router();
const SUCCESS = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTITY = 422;

const err = { status: UNPROCESSABLE_ENTITY,
  message: '',
};

router.post('/', 
  async (req, res, next) => {
    const { name, quantity } = req.body;
    const nameAlredyExist = await verifyNameProductExist(name);
    if (!validateNameProduct(name)) {
      err.message = '"name" length must be at least 5 characters long';
      return next(err);
    };
    if (validateProductQuantity(quantity) === 'Not valid quantity') {
      err.message = '"quantity" must be larger than or equal to 1';
      return next(err);
    }
    if (validateProductQuantity(quantity) === 'Not number') {
      err.message = '"quantity" must be a number';
      return next(err);
    }
    if (nameAlredyExist) {
      err.message = 'Product already exists';
      return next(err);
    }
    await postProducts({ name, quantity });
    const lastProduct = await lastProductDatabase();
    return res.status(CREATED).json(lastProduct);
  }
);

router.get('/', async (_req, res,) => {
  const allProducts = await getAllProducts();
  const products = allProducts;
  return res.status(SUCCESS).json({ products });
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const findId = await findById(id);
  if (!findId) {
    err.message = 'Wrong id format';
    return next(err);
  }
  return res.status(SUCCESS).json(findId);
});

router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  console.log('name:', name);
  if (!validateNameProduct(name)) {
    err.message = '"name" length must be at least 5 characters long';
    return next(err);
  }
  if (validateProductQuantity(quantity) === 'Not valid quantity') {
    err.message = '"quantity" must be larger than or equal to 1';
    return next(err);
  }
  if (validateProductQuantity(quantity) === 'Not number') {
    err.message = '"quantity" must be a number';
    return next(err);
  }
  await updateProduct(id, name, quantity);
  const productUpdated = await findById(id);
  console.log('xxx', productUpdated);
  return res.status(SUCCESS).json(productUpdated);  
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  const storageProduct = await findById(id);
  const removeProduct = await deleteProduct(id);
  console.log('o que tem em remove product?', removeProduct);
  if (!removeProduct) {
    err.message = 'Wrong id format';
    return next(err);
  }
  return res.status(SUCCESS).json(storageProduct);
});

module.exports = router;
