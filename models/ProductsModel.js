const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (name, quantity) => {
  const db = await connection();

  const { insertedId } = await db.collection('products').insertOne({
    name,
    quantity,
  });

  return ({
    _id: insertedId,
    name,
    quantity,
  });
};

const getByName = async (name) => {
  const db = await connection();
  try {
    const product = await db.collection('products').findOne({ name });
    return product;
  } catch (err) {
    return null;
  }
};
  
const getAll = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();
  return products;
};

const getById = async (id) => {
  const db = await connection();
  try {
    const product = await db.collection('products').findOne(ObjectId(id));
    return product;
  } catch (err) {
    return null;
  }
};

const update = async ({ _id, name, quantity }) => {
  const db = await connection();
  try {
    const product = await db.collection('products').updateOne({_id: ObjectId(_id)},
      { $set: {name, quantity} },
    );
    return product;
  } catch (err) {
    return null;
  }
};

const delById = async (id) => {
  const db = await connection();
  await db.collection('products').deleteOne({ '_id': ObjectId(id) });
};

module.exports = {
  create,
  getByName,
  getAll,
  getById,
  update,
  delById,
};
