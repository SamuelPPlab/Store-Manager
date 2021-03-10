const { Router } = require('express');

const { postProducts, getAllProducts, findById } = require('../models/storeModel');
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
    const allProducts = await getAllProducts();
    const indexLastProductAdd = allProducts.length -1;
    return res.status(CREATED).json(allProducts[indexLastProductAdd]);
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
  const productUpdate = await findById(id);
  return res.status(SUCCESS).json(productUpdate);  
});

module.exports = router;
