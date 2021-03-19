const { codeStatus } = require('./setStatus');

class throwError extends Error {
  constructor(statusCode, message, stock) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.stock = stock;
  }
}

const sendError = (err, res) => {
  const { statusCode, message, stock = '' } = err;

  let code = codeStatus[statusCode];

  if (stock !== '') code = 'stock_problem';

  res.status(statusCode).json({
    err: {
      code,
      message,
    },
  });
};

module.exports = {
  throwError,
  sendError,
};
