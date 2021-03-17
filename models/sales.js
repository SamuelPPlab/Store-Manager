const connection = require('./connection');
const { ObjectId } = require('mongodb');

const updateSales = async (collection, id, { productId, quantity }) => {
  const db = await connection(collection);
  return (await db.findOneAndUpdate(
    {
      _id: ObjectId(id),
      'itensSold.productId': productId,
    },
    { $set: { 'itensSold.$.quantity': quantity } },
    { returnOriginal: false },
  ))['value'];
};

module.exports = {
  updateSales,
};
