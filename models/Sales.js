const connection = require('./Connection');
const { ObjectId } = require('mongodb');
const productModel = require('../models/Products');

// const create = async (sale) => {
//   const newSale = { itensSold: sale };
//   const { insertedId } = await connection()
//     .then((db) => db.collection('sales').insertOne(newSale));

//   return {
//     _id: insertedId,
//     ...newSale,
//   };
// };

const create = async (sale) => {
  const { insertedId } = await connection()
    .then((db) =>
      db.collection(collection).insertOne({ itensSold: sale }),
    );
  const ZERO = 0;
  const item = sale[0];

  const product = await productModel.findProductById(item.productId);

  let newQuantity = product.quantity - item.quantity;

  if (newQuantity < ZERO)
    throw new throwError(status.notFound, errors.amountNotPermitted, 'stock_problem');

  await productModel.updateProduct(item.productId, product.name, newQuantity);

  return insertedId;
};

const getAll = async () => {
  return await connection()
    .then((db) => db.collection('sales').find().toArray());
};

const findById = async (id) => {
  return await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));
};

const update = async (id, sale) => {
  return await connection()
    .then((db) => db.collection('sales').updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold: sale } }
    ));
};

// const updateQuantityOfProduct = async (id, sale) => {
//     return await connection()
//       .then((db) => db.collection('sales').updateOne(
//         { _id: ObjectId(id) },
//         { $set: { itensSold: sale } }
//       ));
//   };

const remove = async (id) => {
  return await connection()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  remove
};
