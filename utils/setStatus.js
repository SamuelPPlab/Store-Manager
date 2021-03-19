const status = {
  ok: 200,
  created: 201,
  accepted: 202,
  badRequest: 400,
  unauthorized: 401,
  paymentRequired: 402,
  forbidden: 403,
  notFound: 404,
  unprocessableEntity: 422,
  internalServerError: 500,
  stockProblem: 405,
};

const errors = {
  smallName: '"name" length must be at least 5 characters long',
  lowQuantity: '"quantity" must be larger than or equal to 1',
  quantityAsNumber: '"quantity" must be a number',
  productExists: 'Product already exists',
  wrongId: 'Wrong id format',
  wrongIdOrQuantity: 'Wrong product ID or invalid quantity',
  saleNotFound: 'Sale not found',
  wrongSaleID: 'Wrong sale ID format',
  amountNotPermitted: 'Such amount is not permitted to sell',
};

const codeStatus = {
  404: 'not_found',
  422: 'invalid_data',
  500: 'internal_server_error',
  405: 'stock_problem',
};

module.exports = { status, errors, codeStatus };
