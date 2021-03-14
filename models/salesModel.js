const connection  = require('./connection');
const { ObjectId } = require('mongodb');

const getAllSales = async () => {
  return await connection()
    .then((db) => db.collection('sales').find().toArray());
};

const postSale = async (sale) => {
  sale.map( async (item) => {
    const storage = await (connection()
      .then((db) => db.collection('products')
        .findOne({ _id: ObjectId(item.productId) })));
    const updateQuantity = storage.quantity - item.quantity;
    await updateProductStorage(item.productId, updateQuantity);
  });
  const saleCreate = await connection()
    .then((db) => db.collection('sales')
      .insertOne(({ itensSold: sale }))
    );
  return saleCreate.ops[0];
};

const findSaleById = async (id) => {
  return await connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
};

const saleUpdate = async (id, itensSold) => {
  return connection()
    .then((db) => { db.collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: {itensSold} });
    });
};

const saleDelete = async (id) => {
  const saleToDelete = await findSaleById(id);
  saleToDelete.itensSold.map( async (item) => {
    const storage = await (connection()
      .then((db) => db.collection('products')
        .findOne({ _id: ObjectId(item.productId) })));
    const updateQuantity = storage.quantity + item.quantity;
    await updateProductStorage(item.productId, updateQuantity);
  });
  return connection()
    .then((db) => db.collection('sales').deleteOne({_id: ObjectId(id)}));
};

const updateProductStorage = async (id, quantity) => {
  await (connection()
    .then((db) => db.collection('products')
      .updateOne({_id: ObjectId(id)},
        { $set: { quantity } })
    ));
};

module.exports = {
  getAllSales,
  postSale,
  findSaleById,
  saleUpdate,
  saleDelete
};
