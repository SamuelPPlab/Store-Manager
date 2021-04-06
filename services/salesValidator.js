const UNPROCESSABLE_ENTITY = 422;
const minQuantity = 1;

const message = { 
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  },
};
  
const salesValidator = (sales) => {
  console.log(sales)
  const validatingSales = sales.map(({ quantity }) => {
    if (typeof quantity !== 'number' || quantity < minQuantity) {
      return false;
    }
    return 'Sales are valid!';
  });
  console.log(validatingSales)
  const validatedSales = validatingSales.some((item) => (typeof item !== 'string'));
  if (validatedSales) {
    console.log(validatedSales, 'dentro do if')
    return { status: UNPROCESSABLE_ENTITY, error: message };
  }
  return 'All good!';
};

module.exports = salesValidator;
