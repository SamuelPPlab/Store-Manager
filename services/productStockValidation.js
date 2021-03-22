const Products = require('../models/Products');

module.exports = async (item) => {
  const { quantity, productId } = item;
  const productById = await Products.findById(productId);
  return (quantity > productById.quantity);
};
