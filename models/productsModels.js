const connection = require('./connection');
const { ObjectId } = require('mongodb');

// FIND ALL PRODUCTS
const getAllProducts = async () => {
  const getProducts = { 
    products: await connection()
      .then(mongodb => mongodb.collection('products').find().toArray())};
  return getProducts;
};

// CREATE PRODUCT
const create = async (name,quantity) => {
  const { insertedId } = await connection()
    .then(db => db.collection('products').insertOne({ name, quantity }));
  return {
    _id: insertedId,
    name,
    quantity
  };
};

// FIND PRODUCT BY ID
const findById = async (id) => {
  return await connection()
    .then(mongodb => mongodb.collection('products').findOne(ObjectId(id)));
};

// FIND PRODUCT BY NAME
const findByName = async (name) => {
  return await connection()
    .then(mongodb => mongodb.collection('products').findOne({name}));
};

// UPDATE PRODUCT UNIT
const updateUnitProduct = async (id, name, quantity) => {
  const result = await connection().
    then(mongodb => mongodb.collection('products')
      .updateOne({_id: ObjectId(id)}, {$set: {name, quantity}}));
  
  let _id = id;
  if(result) return { _id, name, quantity };

  return { message: 'Nothing... 404' };
}

;

// EXPORT MODELS FUNCTIONS 
module.exports = {
  create,
  updateUnitProduct,
  findById,
  findByName,
  getAllProducts,
};