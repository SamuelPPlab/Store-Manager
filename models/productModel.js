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

module.exports = {
  getAllProducts,
  postProducts,
  findById,
  updateProduct,
  deleteProduct
};
