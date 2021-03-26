const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (itensSold) => {
  const db = await connection();
  try {
    const { insertedId } = await db.collection('sales').insertOne({ itensSold });
    return ({
      _id: insertedId,
      itensSold,
    }); 
  } catch (err) {
    console.log(err);
  }
  
};

const getAll = async () => {
  const db = await connection();
  const products = await db.collection('sales').find().toArray();
  return products;
};

const getById = async (id) => {
  const db = await connection();
  try {
    const sale = await db.collection('sales').findOne(ObjectId(id));
    return sale;
  } catch (err) {
    return null;
  }
};

const update = async ({ _id, itensSold }) => {
  const db = await connection();
  console.log(itensSold, ObjectId(_id));
  try {
    const sale = await db.collection('sales').updateOne({ _id: ObjectId(_id) },
      { $set: itensSold },
    );
  } catch (err) {
    console.log(err);
  }
};

const delById = async (id) => {
  const db = await connection();
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  delById,
};
