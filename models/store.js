const connection = require('./connection');
const { ObjectId } = require('mongodb');

// products
const createProduct = async (product) => {
  const { name, quantity } = product;
  return await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }));
};
const findByName = async (name) => {
  return await connection().then((db) =>
    db.collection('products').find({ name: { $eq: name } }).count());
};
const ProductList = async () => {
  return await connection().then((db) =>
    db.collection('products').find().toArray());
};
const findById = async (id) => {
  return await connection().then((db) =>
    db.collection('products').findOne(ObjectId(id)));
};
const update = async (id, name, quantity) => {
  return await connection().then((db) =>
    db.collection('products')
      .updateOne({ _id: ObjectId(id) },
        { $set: { name: name, quantity: quantity } }));
};
const remove = async (id) => {
  return await connection().then((db) =>
    db.collection('products').deleteOne({ _id: ObjectId(id) }));
};
//sales
const salesList = async () => {
  return await connection().then((db) =>
    db.collection('sales').find().toArray());
};

const findSalesById = async (id) => {
  return await connection().then((db) =>
    db.collection('sales').findOne(ObjectId(id)));
};
const createSales = async (products) => {
  const create = await connection().then((db) =>
    db.collection('sales')
      .insertOne({ itensSold: products }));
  return create;
};
const saleUpdate = async (id, products) => {
  return await connection().then((db) =>
    db.collection('sales')
      .updateOne({ _id: ObjectId(id) },
        { $set: { itensSold: products } }))
    .catch((err) => {
      console.log(err.message);
    });
};
const salesRemove = async (id) => {
  return await connection().then((db) =>
    db.collection('sales').deleteOne({ _id: ObjectId(id) }));
};
module.exports = {
  createProduct,
  findByName,
  ProductList,
  findById,
  update,
  remove,
  salesList,
  createSales,
  findSalesById,
  saleUpdate,
  salesRemove
};
