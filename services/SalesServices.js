const Sales = require('../models/Sales');
const ProductServices = require('../services/ProductServices');
const validation = require('../services/validation');
const {generateError} = require('../utils/errors');
const {unProcessableEntity, ok, notFound} = require('../utils/status');

const getAll = async () => {
  return await Sales.getAll();
};

const getOne = async (id) => {
  try {
    const itensSold = await Sales.getOne(id);
    if(!itensSold) throw 'something';    
    return {itensSold};
  } catch  {
    return generateError(notFound, 'not_found', 'Sale not found');
  }
};

const validateSales = (itensSold) => {
  const validations = itensSold.map(async (item) => {
    const {err} = await ProductServices.getOne(item.productId);
    if (err) throw err;
    await validation.SalesSchema.validate(item);
  });
  return validations;
};

const validateEntry = async (itensSold) => {    
  try {
    const validations = validateSales(itensSold);
    await Promise.all(validations);    
    return {};
  } catch (err) {
    return generateError(unProcessableEntity,
      'invalid_data', 'Wrong product ID or invalid quantity');
  }  
};

const createOne = async (itensSold) => {  
  const {err} = await validateEntry(itensSold);
  if(err) return {err};
  const {insertedId} = await Sales.create(itensSold);

  return {   
    insertedId    
  };
};


const updateOne = async (id, sale) => {
  const {err} = await validateEntry(sale);
  if(err) return {err};
  const {err: error} = await getOne(id); 
  if (error) return {err: error};
  return await Sales.updateOne(id, sale);
};

const deleteOne = async (id) => {
  
  try {
    const deleteResponse = await Sales.deleteOne(id);
    
    return {status: ok}; 
  } catch {
    return generateError(unProcessableEntity, 'invalid_data', 'Wrong sale ID format');
  }
  
};

module.exports = {
  getAll, getOne, createOne,updateOne, deleteOne
};