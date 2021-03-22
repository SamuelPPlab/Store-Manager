const Products = require('../models/Products');

module.exports = async (id, quantity) => {
  const productById = await Products.findById(id);
  console.log(id, quantity);
  console.log(quantity > productById.quantity);
};