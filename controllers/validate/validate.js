const serviceProducts = require('../../service/serviceProduct');

const NAME_LENGTH_MIN = 5;
const ZERO = 0;
const ONE = 1;

const validateNameLength = async (name) => {
  if (name.length >= NAME_LENGTH_MIN) {
    return true;
  }
  return false;
};

const validateNameUnique = async (name) => {
  const nameExist = await serviceProducts.serviceFindProduct(name);
  if (!nameExist) {
    return true;
  } 
  return false;
};
const validateQuantityType = async (quantity) => {
  if (typeof quantity === 'number') {
    return true;
  };
  return false;
};
const validateQuantitylargeThanZero = async (quantity) => {
  if (quantity >= ONE) {
    return true;
  }
  return false;
};

module.exports = {
  validateNameLength,
  validateNameUnique,
  validateQuantitylargeThanZero,
  validateQuantityType,
};