const errors = {
  name_not_string: 'Nome deve ser string',
  name_length: '"name" length must be at least 5 characters long',
  quantity_not_number: '"quantity" must be a number',
  quantity_smaller_zero: '"quantity" must be larger than or equal to 1',
};

const ZERO = 0;
const isNotString = (value) => (typeof value !== 'string');
const isSmallerThan = (value, number) => (value.length < number);
const isNotNumber = (number) => (typeof number !== 'number');
const isSmallerThanZero = (number) => (number <= ZERO);

const minLengthName = 5;

const getMessage = (name, quantity) => {
  switch (true) {
  case isNotString(name): return errors.name_not_string;
  case isSmallerThan(name, minLengthName): return errors.name_length;
  case isNotNumber(quantity): return errors.quantity_not_number;
  case isSmallerThanZero(quantity): return errors.quantity_smaller_zero;
  default: return null;
  }
};

const validate = (name, quantity) => {
  const code = 'invalid_data';
  const message = getMessage(name, quantity);
  console.log('validando nome');
  console.log('mensagem funcao de validar nome', message);


  if(message !== null) return { err: { code, message } };

  return {};
};

module.exports = {
  validate,
};
