const productsModel = require('./productsModel');

const productSchema = require('../schema/productSchema');

const TAMANHO_ID = 24;

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
  return { CREATED: 201, createdProduct };
};

const getAll = async () => {
  const productsResponse = await productsModel.getAll();

  return productsResponse;
};

const findById = async (id) => {
  if(id.length !== TAMANHO_ID)
    return { err: { code: 'invalid_data', message: 'Wrong id format' } };

  const productById = await productsModel.findById(id);

  if(!productById)
    return { err: { code: 'invalid_data', message: 'Wrong id format' } };

  return { productById };
};

const updateProduct = async (id, name, quantity) => {
  if(id.length !== TAMANHO_ID)
    return { err: { code: 'invalid_data', message: 'Wrong id format' } };

  const validate = productSchema.validate(name, quantity);
  if(validate.err) return validate;

  const updatedProduct = await productsModel.updateProduct(id, name, quantity);

  return { UPDATED: 200, updatedProduct };
};

module.exports = {
  createProduct,
  getAll,
  findById,
  updateProduct,
};
