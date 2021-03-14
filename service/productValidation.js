const { getAllProducts } = require('../models/productModel');

const validateNameProduct = (name) => {
  const minCaracter = 5;
  if (typeof name !== 'string' || name.length <= minCaracter) {
    return false;
  }
  return true;
};

const validateProductQuantity = (quantity) => {
  if (typeof quantity === 'string') {
    return 'Not number';    
  }
  if (!Number.isInteger(quantity) || Math.sign(quantity) !== 1) {
    return 'Not valid quantity';
  }
  return true;
};

const verifyNameProductExist = async (name) =>{
  const allProducts = await getAllProducts();
  const findProduct = allProducts.find((product) => product.name === name);
  if (findProduct) {
    return true;
  }
  return false;
};

module.exports = {
  validateNameProduct,
  validateProductQuantity,
  verifyNameProductExist,
};
