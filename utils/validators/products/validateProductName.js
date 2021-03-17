const { error, validations } = require('../../dictionary');

module.exports = (name) => {
  if (!name) throw new Error(error.invalidProductNameSize);
  const isValid = name.length >= validations.nameSize;
  if (!isValid) throw new Error(error.invalidProductNameSize);
  return isValid;
};
