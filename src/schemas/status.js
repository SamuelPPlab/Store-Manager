const status = {
  success: 200,
  created: 201,
  unprocessableEntity: 422,
  notFound: 404,
};

const errors = {
  nameLength: '"name" length must be at least 5 characters long',
  qttBiggerOne: '"quantity" must be larger than or equal to 1',
  qttMustBeNumber: '"quantity" must be a number',
  productExists: 'Product already exists',
  idFormat:'Wrong id format',
  wrongIdOrQuantity: 'Wrong product ID or invalid quantity',
  saleNotFound: 'Sale not found',
  wrongSaleID: 'Wrong sale ID format',
  amountNotPermitted: 'Such amount is not permitted to sell',
};

const codeStatus = {
  invalidData: 'invalid_data',
  notFound: 'not_found',
};

module.exports = {
  status,
  errors,
  codeStatus,
};
