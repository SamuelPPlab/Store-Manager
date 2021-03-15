const { Router } = require('express');
const productController = require('../controllers/productController');
const { validateCreateProduct } = require('../utils/validationErrors');

const productRouter = new Router();

productRouter.post('/', validateCreateProduct, productController.createProduct);

productRouter.get('/', productController.getAllProducts);

productRouter.get('/:id', productController.getProductById);

productRouter.put('/:id', validateCreateProduct, productController.updateProduct);

productRouter.delete('/:id', productController.deleteProduct);

module.exports = productRouter;
