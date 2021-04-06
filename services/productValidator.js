const { findProductByName } = require('../models/productsModel');

const minNameLength = 5;
const minQuantity = 1;
const UNPROCESSABLE_ENTITY = 422;

const messages = {
  smallName: { err: {
    code: 'invalid_data',
    message: '"name" length must be at least 5 characters long',
  } },
  alradyExists: { err: {
    code: 'invalid_data',
    message: 'Product already exists',
  } },
  noNegativeQuantity: { err: {
    code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1',
  } },
  noStringOnQuantity: { err: {
    code: 'invalid_data',
    message: '"quantity" must be a number',
  } },
};

const doesItExist = async (name) => {
  const productByName = await findProductByName(name);
  if (productByName !== null) {
    return { status: UNPROCESSABLE_ENTITY, error: messages.alradyExists };
  }
  return 'No!';
};

const productValidator = async (name, quantity) => {
  const lengthName =  name.length;
  if (lengthName < minNameLength) {
    return { status: UNPROCESSABLE_ENTITY, error: messages.smallName };
  }

  if (typeof quantity !== 'number' ) {
    return { status: UNPROCESSABLE_ENTITY, error: messages.noStringOnQuantity };
  }

  if (quantity < minQuantity) {
    return { status: UNPROCESSABLE_ENTITY, error: messages.noNegativeQuantity };
  }

  return 'Data is valid!';
};

module.exports = {
  productValidator,
  doesItExist,
};
