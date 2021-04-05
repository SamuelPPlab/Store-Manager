const { Router } = require('express');
const rescue = require('express-rescue');
const { ObjectId } = require('mongodb');

const router = Router();
const ProductsService = require('../services/ProductsService');
const { validateNewProduct } = require('../middlewares/validateProduct');
const { validateDuplicated } = require('../middlewares/handleDuplicatedProducts');
// const { validateId } = require('../middlewares/validateProductID');
const CREATED = 201;
const SUCCESS = 200;
const UNPROCESSABLE_ENTITY = 422;

router.post('/products',
  validateNewProduct,
  validateDuplicated,
  rescue (async (req, res) => {
    const { name, quantity } = req.body;

    const result = await ProductsService.createProduct(name, quantity);
    return res.status(CREATED).json({ _id:result, name, quantity });
  }));

router.get('/products', rescue (async (_req, res) => {
  const allProducts = await ProductsService.getAll();
  res.status(SUCCESS).json({ products:allProducts });
}));

router.get('/products/:id', rescue(async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(UNPROCESSABLE_ENTITY)
      .json({err: { 
        code: 'invalid_data',  
        message: 'Wrong id format' 
      } });
  }

  const product = await ProductsService.getById(id);
  if (!product) {
    return res.status(UNPROCESSABLE_ENTITY)
      .json({err: { 
        code: 'invalid_data',  
        message: 'Wrong id format' 
      } });
  }

  return res.status(SUCCESS).json(product);
}));

router.put('/products/:id', validateNewProduct, rescue (async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const updateProduct = {
    name,
    quantity,
  };

  const result = await ProductsService.updateProduct(id, updateProduct);
  return res.status(SUCCESS).json(result);
}));

router.delete('/products/:id', rescue (async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(UNPROCESSABLE_ENTITY)
      .json({err: { 
        code: 'invalid_data',  
        message: 'Wrong id format' 
      } });
  }

  const deletedProduct = await ProductsService.getById(id);
  
  if (!deletedProduct) {
    return res.status(ERROR)
      .json({err: { 
        code: 'invalid_data',  
        message: 'Wrong id format' 
      } });
  }

  await ProductsService.deleteProduct(id);
  res.status(SUCCESS).json(deletedProduct);
}));

module.exports = router;
