const { ObjectId } = require('mongodb');
const ProductsService = require('../services/ProductsService');
const SalesService = require('../services/SalesService');
const NOT_FOUND = 404;
const ZERO = 0;
const UNPROCESSABLE_ENTITY = 422;

const updateProductQuantity = async (req, res, next) => {
  const products = req.body;

  products.map(async (item) => {
    const { productId, quantity } = item;
    if (!ObjectId.isValid(productId)) {
      return res.status(UNPROCESSABLE_ENTITY)
        .json({err: { 
          code: 'invalid_data',  
          message: 'Wrong sale ID format' 
        } });
    }
    const product = await ProductsService.getById(productId);
    const updatedProductQuantity = {
      name: product.name,
      quantity: product.quantity - quantity 
    };

    if (updatedProductQuantity.quantity < ZERO) {
      return res.status(NOT_FOUND).json({err: { 
        code: 'stock_problem',  
        message: 'Such amount is not permitted to sell' 
      } });
    }

    await ProductsService.updateProduct(productId, updatedProductQuantity);
  });
  next();
};

const updateDeletedSales = async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(UNPROCESSABLE_ENTITY)
      .json({err: { 
        code: 'invalid_data',  
        message: 'Wrong sale ID format' 
      } });
  }

  const arrSales = await SalesService.getById(id);
  arrSales.itensSold.map(async (item) => {
    const { productId, quantity } = item;
    const product = await ProductsService.getById(productId);
    const updateProduct = {
      name: product.name,
      quantity: product.quantity + quantity
    };

    await ProductsService.updateProduct(productId, updateProduct);
  });
  next();
};

module.exports = {
  updateProductQuantity,
  updateDeletedSales
};
