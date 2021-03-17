const { error, validations } = require('../../dictionary');

module.exports = (quantity) => {
  if (typeof quantity !== 'number') throw new Error(error.invalidSaleIdOrQuantity);
  const isValid = quantity >= validations.minQuantity;
  if (!isValid) throw new Error(error.invalidSaleIdOrQuantity);
  return isValid;
};
