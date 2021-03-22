const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const allProducts = await connection()
    .then((db) => db.collection('products')
      .find().toArray());

  return {
    products: allProducts
  };
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const productById = await connection()
    .then((db) => db.collection('products')
      .findOne(ObjectId(id)));
  
  return productById;
};
 
const findByName = async (name) => {
  const product = await connection()
    .then((db) => db.collection('products')
      .findOne({name}));
  
  return product;
};

const create = async (name, quantity) => {
  const newProduct = await connection()
    .then(db => db.collection('products')
      .insertOne({ name, quantity }));

  return { 
    _id: newProduct.insertedId,
    name,
    quantity
  };
};

const update = async (id, name, quantity) => {
  const productUpdated = await connection()
    .then(db => db.collection('products')
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { name, quantity } },
        { returnOriginal: false }
      ));

  return productUpdated['value'];
};

const remove = async (id) => {
  const productDeleted = await connection()
    .then(db => db.collection('products')
      .findOneAndDelete({ _id: ObjectId(id) }));

  return productDeleted['value'];
};

const increaseQuantity = async (id, quantity) => {
  const productUpdated = await connection()
    .then(db => db.collection('products')
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $inc: { quantity: quantity } },
        { returnOriginal: false }
      ));
      
  return productUpdated['value'];
};

const decreaseQuantity = async (id, quantity) => {
  const productUpdated = await connection()
    .then(db => db.collection('products')
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $inc: { quantity: - quantity } },
        { returnOriginal: false }
      ));
      
  return productUpdated['value'];
};

module.exports = {
  getAll,
  findById,
  findByName,
  create,
  update,
  remove,
  increaseQuantity,
  decreaseQuantity,
};
