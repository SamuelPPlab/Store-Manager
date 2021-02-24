const products = require('../models/products');

const minNameLength = 5;
const nullQuantity = 0;
const nameLengthErrorMessage = '"name" length must be at least 5 characters long';
const nameExists = 'Product already exists';
const quantityErrorMessage = '"quantity" must be larger than or equal to 1';
const quantityTypeErrorMessage = '"quantity" must be a number';

const isValid = async (name, quantity) => {
  const checkUnique = await products.findByName(name);

  if (name.length < minNameLength) return nameLengthErrorMessage;
  if (checkUnique) return nameExists;
  if (!Number.isInteger(quantity)) return quantityTypeErrorMessage;
  if (quantity <= nullQuantity) return quantityErrorMessage;

  return true;
};

const getAll = async () => {
  const products = await products.getAll();

  return products;
};

const findById = async (id) => {
  const product = await products.findById(id);

  if (!product) return null;

  return product;
};

const create = async (productName, quantity) => {
  const validOrErrorMessage = await isValid(productName, quantity);
  if (validOrErrorMessage !== true) return {
    err: {
      code: 'invalid_data',
      message: validOrErrorMessage,
    }
  };

  const { insertedId } = await products.create({ name: productName, quantity });

  return {
    _id: insertedId,
    name: productName,
    quantity
  };
};

module.exports = {
  getAll,
  findById,
  create,
};