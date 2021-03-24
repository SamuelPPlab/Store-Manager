const salesModel = require('./salesModel');

const TAMANHO_ID = 24;
const ZERO = 0;

const createSale = async (sales) => {
  console.log('service - sales');

  const salesIds = sales.map((sale) => sale.productId);
  for(let i = ZERO; i <= salesIds.length - 1; i ++) {
    if(salesIds[i].length !== TAMANHO_ID)
      return { err: { code: 'invalid_data', message: 'Wrong id format' } };
  };

  const salesQuantitys = sales.map((sale) => sale.quantity);
  for(let i = ZERO; i <= salesIds.length - 1; i ++) {
    if(typeof salesQuantitys[i] !== 'number' || salesQuantitys <= ZERO)
      return { err: {
        code: 'invalid_data', message: 'Wrong product ID or invalid quantity'
      } };
  };

  const createdSale = await salesModel.createSale(sales);
  return { CREATED: 200, createdSale };
};

module.exports = {
  createSale,
};
