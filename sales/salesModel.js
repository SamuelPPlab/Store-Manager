const { ObjectId } = require('mongodb');

const productsModel = require('../products/productsModel');

const connection = require('../connection');

const ZERO = 0;

const createSale = async (sales) => {
  console.log('model - sales');
  const { insertedId } =  await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sales }));
  return { _id: insertedId, itensSold: sales };
};

const getAllSales = async () => {
  const allSales = await connection()
    .then((db) => db.collection('sales').find().toArray());
  return allSales;
};

const findByIdSale = async (id) => {
  const saleById = await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));
  return saleById;
};

const updateSale = async (id, sales) => {
  await connection()
    .then((db) => db.collection('sales').updateOne(
      {_id: ObjectId(id)}, {$set: {itensSold: sales}}
    ));
  return { _id: id, itensSold: sales };
};

const deleteSale = async (id) => {
  const responseSale = await findByIdSale(id);
  const products = responseSale.itensSold;
  products.forEach(async (product) => {
    const productById = await productsModel.findById(product.productId);
    const quantityStock = productById.quantity;
    productsModel.updateQuantityProduct(
      product.productId, (quantityStock + product.quantity)
    );
  });

  const deletedSale = await connection()
    .then((db) => db.collection('sales').deleteOne({_id: ObjectId(id)}));
  return deletedSale;
};

module.exports = {
  createSale,
  getAllSales,
  findByIdSale,
  updateSale,
  deleteSale,
};
