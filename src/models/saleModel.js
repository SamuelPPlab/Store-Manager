const connection = require('../database/connection');
const { ObjectId } = require('mongodb');
const collection = 'sales';
const { throwError } = require('../utils/errorHandler');
const { status, errors } = require('../utils/status.js');
const productModel = require('./productModel');

const createSale = async (sale) => {
  const { insertedId } = await connection().then((db) =>
    db.collection(collection).insertOne({ itensSold: sale }),
  );
  const ZERO = 0;
  const item = sale[0];

  const product = await productModel.getProductById(item.productId);

  let newQuantity = product.quantity - item.quantity;

  if (newQuantity < ZERO)
    throw new throwError(status.notFound, errors.amountNotPermitted, 'stock_problem');

  await productModel.updateProduct(item.productId, product.name, newQuantity);

  return insertedId;
};

const getAllSales = async () => {
  const sales = await connection().then((db) =>
    db.collection(collection).find().toArray(),
  );

  return sales;
};

const getSaleById = async (id) => {
  const sale = await connection()
    .then((db) => db.collection(collection).findOne({ _id: ObjectId(id) }))
    .catch((error) => {
      throw new throwError(status.notFound, errors.saleNotFound);
    });

  return sale;
};

const getSaleByIdToDelete = async (id) => {
  const sale = await connection()
    .then((db) => db.collection(collection).findOne({ _id: ObjectId(id) }))
    .catch((error) => {
      throw new throwError(status.unprocessableEntity, errors.wrongSaleID);
    });

  return sale;
};

const updateSale = async (id, sale) => {
  const {
    result: { nModified },
  } = await connection().then((db) =>
    db
      .collection(collection)
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: sale } }),
  );

  return nModified;
};

const deleteSale = async (id) => {
  const ZERO = 0;
  const item = await getSaleById(id);

  if (!item) throw new throwError(status.notFound, errors.wrongSaleID);

  const deletedSale = await connection()
    .then((db) => {
      db.collection(collection).deleteOne({ _id: ObjectId(id) });
    })
    .catch((err) => {
      throw new throwError(status.notFound, errors.wrongSaleID);
    });

  const productItem = item.itensSold[0];
  const product = await productModel.getProductById(productItem.productId);
  if (!product) throw new throwError(status.notFound, errors.wrongSaleID);

  let newQuantity = product.quantity + productItem.quantity;

  await productModel.updateProduct(productItem.productId, product.name, newQuantity);

  return deletedSale;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
  getSaleByIdToDelete,
};
