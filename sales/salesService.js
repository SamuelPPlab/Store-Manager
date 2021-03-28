const salesModel = require('./salesModel');
const productsModel = require('../products/productsModel');

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

  for (let i = ZERO; i < sales.length; i ++) {
    let productId = sales[i].productId;
    let product = await productsModel.findById(productId);
    let newQuantity = sales[i].quantity;
    let quantityStock = product.quantity;
    if (newQuantity > quantityStock) {
      return { err: {
        code: 'stock_problem', message: 'Such amount is not permitted to sell'
      }, statusCode: 404 };
    }
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

async function verifyStock(saleId, newArrayProductsSold) {
  const registeredSale = await salesModel.findByIdSale(saleId);
  const arrayProductsSold = registeredSale.itensSold;
  for (let i = ZERO; i < arrayProductsSold.length; i ++) {
    let productId = arrayProductsSold[i].productId;
    let product = await productsModel.findById(productId);
    let oldQuantity = arrayProductsSold[i].quantity;
    let newQuantity = newArrayProductsSold[i].quantity;
    let quantitiesSubtraction = newQuantity - oldQuantity;
    let quantityStock = product.quantity;
    if (quantitiesSubtraction > quantityStock) {
      return { err: {
        code: 'stock_problem', message: 'Such amount is not permitted to sell'
      }, statusCode: 404 };
    }
  };
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

  const verify = await verifyStock(id, sales);
  if (verify) return { err: {
    code: 'stock_problem', message: 'Such amount is not permitted to sell'
  }, statusCode: 404 };

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
