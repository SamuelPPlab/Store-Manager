const { status, errors, codeStatus } = require('../schemas/status');
const rescue = require('express-rescue');

// Functions
const theLengthLessThan = (value, number) => (!value || value.length < number);
const isBiggerThan = (value, number) => (!value || value <= number);
const isTypeIs = (value, typeOfValue) => (!value || typeof value !== typeOfValue);

const validateName = rescue((req, res, next) => {
  const { name } = req.body;

  const minLength = 5;
  
  if (!name || theLengthLessThan(name, minLength)) {
    return res.status(status.unprocessableEntity)
      .json({ err: { code: codeStatus.invalidData, message: errors.nameLength }});
  }

  next();
});

const validateQuantity = rescue((req, res, next) => {
  const { quantity } = req.body;

  const minValue = 0;
  if (isBiggerThan(quantity, minValue)) {
    return res.status(status.unprocessableEntity)
      .json({ err:{ code: codeStatus.invalidData, message: errors.qttBiggerOne }});
  }
  
  if (isTypeIs(quantity, 'number')) {
    return res.status(status.unprocessableEntity)
      .json({ err: { code: codeStatus.invalidData, message: errors.qttMustBeNumber }});
  }

  next();
});

const validateId = rescue((req, res, next) => {
  const { id } = req.params;

  const idLength = 24;

  if (!id || id.length !== idLength) {
    return res.status(status.unprocessableEntity)
      .json({ err: { code: codeStatus.invalidData, message: errors.idFormat }});
  };


  next();
});

module.exports = {
  validateName,
  validateQuantity,
  validateId,
};