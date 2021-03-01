const Model = require('../models/salesModel');

const notIsNumber = (value) => (typeof value !== 'number');
const lessThanEqual = (value, min) => (value <= min);
const ZERO = 0;

const registerManySales = async (itensSold ) => {
  
  const quantityLessThanOrEqualZero = itensSold
    .some((el) => lessThanEqual(el.quantity, ZERO));
    
  if (quantityLessThanOrEqualZero) {
    return {message: 'Wrong product ID or invalid quantity'};
  };
  
  const quantityNotIsNumber = itensSold.some((el) => notIsNumber(el.quantity));
  if (quantityNotIsNumber) return {message: 'Wrong product ID or invalid quantity'};
  
  const { insertedId } = await Model.registerManySales(itensSold );
  return {
    _id: insertedId,
    itensSold
  };
};

module.exports = {
  registerManySales
};
