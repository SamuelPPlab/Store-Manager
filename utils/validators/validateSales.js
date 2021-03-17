const { ObjectId } = require('mongodb');

const { error } = require('../dictionary');
const validateQuantity = require('./sales/validateQuantity');

module.exports = async (sales) => {
  sales.forEach(({ productId, quantity }) => {
    if (!ObjectId.isValid(productId)) throw new Error(error.invalidSaleIdOrQuantity);
    validateQuantity(quantity);
  });  
};
