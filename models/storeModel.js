const connection  = require('./connection');

const { ObjectId } = require('mongodb');

const getAllProducts = async () => {
  return await connection()
    .then((db) => db.collection('products').find().toArray());
};

const postProducts = async ({ name, quantity }) => {
  return await connection()
    .then((db) => db.collection('products')
      .insertOne(({
        name,
        quantity
      }))
    );
};

const findById = async (id) => {
  const product = await connection()
    .then((db) => db
      .collection('products')
      .findOne({_id: ObjectId(id)})
    ).catch(() => {
      return false;
    });
  return product;
};

const updateProduct = async (id, name, quantity) => {
  const updatedProduct = await connection()
    .then((db) => { db
      .collection('products')
      .updateOne(
        {_id: ObjectId(id)},
        {$set: {name, quantity}}
      );
    });
  return updatedProduct;
};

const deleteProduct = async (id) => {
  return await connection()
    .then((db) => { db
      .collection('products')
      .deleteOne({_id: ObjectId(id)});
    })
    .then(() => true)
    .catch(() => false);
};

const getAllSales = async () => {
  return await connection()
    .then((db) => db.collection('sales').find().toArray());
};

const postSale = async (sale) => {
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

const updateSale = async (id, itensSold) => {
  return connection()
    .then((db) => {
      db.collection('sales')
        .updateOne({ _id: ObjectId(id) }, { $set: {itensSold} });
    });
};


module.exports = {
  getAllProducts,
  postProducts,
  updateProduct,
  deleteProduct,
  getAllSales,
  postSale,
  findSaleById,
  updateSale,
  findById
};
