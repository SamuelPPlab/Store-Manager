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

  if (!createdSale) return { err: {
    code: 'stock_problem', message: 'Such amount is not permitted to sell'
  }, statusCode: 404 };

  return { CREATED: 200, createdSale };
};

const getAllSales = async () => {
  const allSales = await salesModel.getAllSales();

  return allSales;
};

const findById = async (id) => {
  if(id.length !== TAMANHO_ID)
    return { err: { code: 'not_found', message: 'Sale not found' } };

  const saleById = await salesModel.findByIdSale(id);

  if(!saleById)
    return { err: { code: 'not_found', message: 'Sale not found' } };

  return { saleById };
};

const updateSale = async (id, sales) => {
  const salesIds = sales.map((sale) => sale.productId);
  const salesQuantitys = sales.map((sale) => sale.quantity);
  for(let i = ZERO; i <= salesIds.length - 1; i ++) {
    if(typeof salesQuantitys[i] !== 'number' || salesQuantitys <= ZERO)
      return { err: {
        code: 'invalid_data', message: 'Wrong product ID or invalid quantity'
      } };
  };

  const updatedSale = await salesModel.updateSale(id, sales);

  return { UPDATED: 200, updatedSale };
};

const deleteSale = async (id) => {
  if(id.length !== TAMANHO_ID)
    return { err: { code: 'invalid_data', message: 'Wrong sale ID format' } };

  const saleById = await salesModel.findByIdSale(id);

  const deletedSale = await salesModel.deleteSale(id);

  if(!deletedSale)
    return { err: { code: 'invalid_data', message: 'Wrong sale ID format' } };

  return { OK: 200, saleById };
};

module.exports = {
  createSale,
  getAllSales,
  findById,
  updateSale,
  deleteSale,
};
