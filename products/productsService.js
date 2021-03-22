const productsModel = require('./productsModel');

const productSchema = require('../schema/productSchema');

const createProduct = async (name, quantity) => {
  console.log('service - products');

  const validate = productSchema.validate(name, quantity);
  console.log('VALIDATE - service', validate);
  if(validate.err) return validate;

  const existsProduct = await productsModel.findByName(name);
  console.log('existe - service', existsProduct);
  if(existsProduct) {
    return { err: { code: 'invalid_data', message: 'Product already exists' } };
  }

  const createdProduct = await productsModel.createProduct(name, quantity);
  console.log('createdProduct - service:', createdProduct);
  return { code: 201, createdProduct };
};

module.exports = {
  createProduct,
};
