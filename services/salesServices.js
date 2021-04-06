const Sales = require('../models/salesModel');

const createSales = async(sales) => {
  const newSale = await Sales.createSales(sales);
  
  return newSale;
};

const getAllSales = async() => {
  const foundAll = await Sales.getAllSales();

  return foundAll;
};

const findSalesById = async(id) => {
  const foundId = await Sales.findSalesById(id);

  return foundId;
};

const updateSales = async(id, itensSold) => {
  const saleUpdate = await Sales.updateSales(id, itensSold);
  
  return saleUpdate;
};

const deleteSales = async(id) => {
  const salesDelete = await Sales.deleteSales(id);
  
  return salesDelete;
};

module.exports = {
  createSales,
  getAllSales,
  findSalesById,
  updateSales,
  deleteSales,
};