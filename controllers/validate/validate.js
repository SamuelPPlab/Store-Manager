const { ObjectId } = require('mongodb');
const serviceProducts = require('../../service/serviceProduct');
const serviceSale = require('../../service/serviceSales');

const NAME_LENGTH_MIN = 5;
const ZERO = 0;
const ONE = 1;
const IDLENGTH = 24;

const validateNameLength = (name) => {
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
const validateQuantityType = (quantity) => {
  if (typeof quantity === 'number') {
    return true;
  };
  return false;
};
const validateQuantitylargeThanZero = (quantity) => {
  if (quantity >= ONE) {
    return true;
  }
  return false;
};
const validateId = (id) => {
  if (id.length !== IDLENGTH)
    return false;
};

const validateDelete = async (id) => {
  const prod = await serviceSale.serviceGetSaleById(id);
  if (prod === null || prod === {}) {
    return { 
      valid: false,
      json: {
        err: {
          code: 'invalid_data',
          message: 'Wrong sale ID format',
        }
      }, status: 422 };
  }
  return { valid: true, json: prod, status: 200 };
};

module.exports = {
  validateNameLength,
  validateNameUnique,
  validateQuantitylargeThanZero,
  validateQuantityType,
  validateId,
  validateDelete,
};