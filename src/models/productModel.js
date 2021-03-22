const { ObjectId } = require('mongodb');
const connection = require('./connection');

// Cria um produto
const createProduct = async (name, quantity) => {
  const { insertedId }  = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  const newProduct = { _id: insertedId, name, quantity };

  return newProduct;
};

// Acha um produto pelo nome
const findProductByName = async (name) => {
  const productByName = await connection()
    .then((db) => db.collection('products').findOne({ name }));

  return productByName;
};

// Lista todos os produtos
const getAllProducts = async () => {
  const allProducts = await connection()
    .then((db) => db.collection('products').find().toArray());

  return allProducts;
};

// Lista produtos por ID
const findProductById = async (id) => {
  const productById = await connection()
    .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));

  return productById;
};

// Atualiza um produto
const updateProduct = async (id, name, quantity) => {
  const updatedProduct = await connection()
    .then((db) => { db.collection('products').updateOne(
      { _id: ObjectId(id) },
      { $set: { name, quantity } },
    );});

  return updatedProduct;
};

// Remover um produto 
const deleteProduct = async (id) => {
  const deletedProduct = await connection()
    .then((db) => { db.collection('products').deleteOne(
      { _id: ObjectId(id) }
    );});

  return deletedProduct;
};

module.exports = {
  createProduct,
  findProductByName,
  getAllProducts,
  findProductById,
  updateProduct,
  deleteProduct,
};
