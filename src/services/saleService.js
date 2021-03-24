const SaleModel = require('../models/saleModel');

// Criação da venda
const createSale = async(itensSold) => {
  const newSale = await SaleModel.createSale(itensSold);

  return newSale;
};

// Lista todas as vendas 
const getAllSales = async () => {
  const allSales = await SaleModel.getAllSales();

  return ({ sales: allSales });
};

// Lista vendas por ID
const findSaleById = async (id) => {
  const saleById = await SaleModel.findSaleById(id);

  return saleById;
};

// Atualizar venda por ID
const updateSale = async (id, itensSold) => {
  const updatetSale = await SaleModel.createSale(id, itensSold);

  return updatetSale;
};

// Remover venda por ID
const deleteSale = async (id) => {
  const deleteProduct = await SaleModel.deleteSale(id);

  return deleteProduct;
};

module.exports = {
  createSale,
  getAllSales,
  findSaleById,
  updateSale,
  deleteSale,
};
