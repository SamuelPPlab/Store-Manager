const rescue = require('express-rescue');
const validate = require('./validations');
const { throwError } = require('./errorHandler');
const { status, errors } = require('./status');

const validateCreateProduct = rescue((req, _res, next) => {
  const { name, quantity } = req.body;

  const minLength = 5;
  const minValue = 0;

  if (!validate.nameValidation(name, minLength)) {
    throw new throwError(status.unprocessableEntity, errors.smallName);
  }

  if (!validate.quantityTypeValidation(quantity)) {
    throw new throwError(status.unprocessableEntity, errors.quantityAsNumber);
  }

  if (!validate.quantityValidation(quantity, minValue)) {
    throw new throwError(status.unprocessableEntity, errors.lowQuantity);
  }

  next();
});

const validateCreateSale = rescue((req, _res, next) => {
  const sales = req.body;

  const minValue = 0;

  sales.forEach((sale) => {
    if (!validate.quantityValidation(sale.quantity, minValue)) {
      throw new throwError(status.unprocessableEntity, errors.wrongIdOrQuantity);
    }

    if (!validate.quantityTypeValidation(sale.quantity)) {
      throw new throwError(status.unprocessableEntity, errors.wrongIdOrQuantity);
    }
  });

  next();
});

module.exports = {
  validateCreateProduct,
  validateCreateSale,
};
