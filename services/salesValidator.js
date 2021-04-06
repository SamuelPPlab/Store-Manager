const UNPROCESSABLE_ENTITY = 422;
const minQuantity = 1;

const message = { 
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  },
};
  
const salesValidator = (sales) => {
  sales.map(({ quantity }) => {
    if (typeof quantity !== 'number' || quantity < minQuantity) {
      return { status: UNPROCESSABLE_ENTITY, error: message };
    }
  });
  return 'Sales are valid!';
};

module.exports = {
  salesValidator,
};
