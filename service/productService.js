const { ObjectId } = require('mongodb');
const MIN_NAME_LENGTH = 5;
const UNPROCESSABLE = 422;
const MIN_QUANTITY = 0;
const {
  getAllProducts,
  createProduct,
  getProduct,
} = require('../models/productModel');

const createNewProduct = async (product) => await createProduct(product);
const getAllProductsService = async () => await getAllProducts();
const getProductById = async (id) => await getProduct(id);

const validateName = async (req, res, next) => {
  const { name } = req.body;
  if (!name || name.length < MIN_NAME_LENGTH) {
    return res.status(UNPROCESSABLE)
      .json({
        err: {
          code: 'invalid_data',
          message: '\"name"\ length must be at least 5 characters long'
        }
      });
  }
  const productList = await getAllProducts();
  const checkUnique = await productList.find((product) => product.name === name);
  if (checkUnique) {
    return res.status(UNPROCESSABLE)
      .json({
        err: {
          code: 'invalid_data',
          message: 'Product already exists'
        }
      });
  }
  next();
};

const validateQuantity = async (req, res, next) => {
  const { quantity } = req.body;
  if (!quantity || quantity <= MIN_QUANTITY) {
    return res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: '\"quantity\" must be larger than or equal to 1'
      }
    });
  }
  else if (typeof quantity !== 'number'){
    return res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: '\"quantity\" must be a number'
      }
    });
  }
  next();
};

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });
  }
  next();
};

module.exports = {
  validateName,
  createNewProduct,
  validateQuantity,
  getAllProductsService,
  getProductById,
  validateId,
};
