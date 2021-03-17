const connection = require('./connection');
const { ObjectId } = require('mongodb');

const queryByName = async (collection, name) => {
  const db = await connection(collection);
  return await db.findOne({ name });
};

const updateProduct = async (collection, id, data) => {
  const db = await connection(collection);
  await db.updateOne(
    { _id: ObjectId(id) },
    { $set: data },
  );
};

module.exports = {
  queryByName,
  updateProduct,
};
