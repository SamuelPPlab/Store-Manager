const model = require('../Models/storeManagerBD');
const minCaractName = 5;
const zero = 0;

const quantityValid = (_name, quantity) => {
  if (!quantity || !Number.isInteger(quantity) || quantity === zero) return false;  
  return true;
};

const nameValid = (name, _quantity) => {
  if(typeof name !== 'string' || name.length < minCaractName) return false;
  return true;
};

const productRepeat = async (name) => {
  const getAllProducts = await model.getAllProducts();
  const notFound = getAllProducts.filter((product) => product.name === name);
  if(notFound.length > zero) return false;
  return true;
};

const productCreate = async (name, quantity) => {
  const produto = await model.createProduct(name, quantity);
  return produto;
};

const getAllProducts = async () => {
  const products = await model.getAllProducts();
  return products;
};

const findByIdProducts = async (id) => {
  const product = await model.findByIdProducts(id);
  return product;
};

const updateProduct = async (id, name, quantity) => {
  const product = await model.updateProduct(id, name, quantity);
  return product;
};

const deleteProduct = async (id) => {
  const productDeleted = await model.deleteProduct(id);

};

module.exports = {
  quantityValid,
  nameValid,
  productRepeat,
  productCreate,
  getAllProducts,
  findByIdProducts,
  updateProduct,
  deleteProduct
};
