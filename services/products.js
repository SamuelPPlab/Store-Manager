const { error } = require('../utils/dictionary');
const { products, utils } = require('../models');
const { validateProduct } = require('../utils/validators');

const createProduct = async (product) => {
  const isNameTaken = await findByName(product.name);
  await validateProduct(product, isNameTaken);
  return utils.insertToDb('products', product);
};

const findByName = async (name) => products.queryByName('products', name);

const getProducts = async (id) => {
  const productsList = await utils.queryFromDb('products', id);
  if (!productsList) throw new Error(error.invalidId);
  return productsList;
};

const productUpdate = async (id, body) => {
  const product = await getProducts(id);
  const updatedProduct = { ...product, ...body };
  await validateProduct(updatedProduct);
  await products.productUpdate('products', id, updatedProduct);
  return updatedProduct;
};

const productDelete = async (id) => {
  await getProducts(id);
  return utils.deleteFromDb('products', id);
};

module.exports = {
  createProduct,
  productDelete,
  findByName,
  getProducts,
  productUpdate,
};
