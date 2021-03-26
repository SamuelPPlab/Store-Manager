const { ObjectId } = require('mongodb');
const connection = require('./connection');

// Criação da venda
const createSale = async (itensSold) => {
  const { insertedId }  = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }));
  const newSale = { _id: insertedId, itensSold };

  return newSale;
};

// Lista todas as vendas 
const getAllSales = async () => {
  const allSales = await connection()
    .then((db) => db.collection('sales').find().toArray());

  return allSales;
};

// Lista vendas por ID
const findSaleById = async (id) => {
  const saleById = await connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));

  return saleById;
};

// Atualiza uma venda
const updateSale = async (id, itensSold) => {
  const updatedSale = await connection()
    .then((db) => { db.collection('sales').updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold: sale } }
    );});

  return updatedSale;
};

// Exclui uma venda
const deleteSale = async (id) => {
  const deletedSale = await connection()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));

  return deletedSale;
};

module.exports = {
  createSale,
  getAllSales,
  findSaleById,
  updateSale,
  deleteSale,
};
