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

const getAllSales = async () => {
  const allSales = await salesModel.getAllSales();

  return allSales;
};

const findById = async (id) => {
  if(id.length !== TAMANHO_ID)
    return { err: { code: 'not_found', message: 'Sale not found' } };

  const productById = await salesModel.findById(id);

  if(!productById)
    return { err: { code: 'not_found', message: 'Sale not found' } };

  return { productById };
};

module.exports = {
  createSale,
  getAllSales,
  findById
};
