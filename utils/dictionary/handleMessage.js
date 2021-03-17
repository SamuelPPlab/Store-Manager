const badRequest = 400;

module.exports = (message, status = badRequest, code = 'invalid_data') =>
  (JSON.stringify({ code, message, status }));
  