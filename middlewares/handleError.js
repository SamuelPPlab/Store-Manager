const INTERNAL_SERVER_ERROR = 500;
const UNPROCESSABLE_ENTITY = 422;
const NOT_FOUND = 404;

module.exports = (error, _request, response, _next) => {
  const { err } = error || undefined;
  
  if (err.code === 'not_found') {
    return response.status(NOT_FOUND).json({ err });
  }

  if(err.code === 'stock_problem') {
    console.log('stock problem');
    return response.status(NOT_FOUND).json({ err });
  }

  if (err) {
    return response.status(UNPROCESSABLE_ENTITY).json({ err });
  }
  
  response.status(INTERNAL_SERVER_ERROR).json({ code: 'server_error' });
};