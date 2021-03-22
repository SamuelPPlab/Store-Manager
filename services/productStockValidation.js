const Products = require('../models/Products');

module.exports = async (item) => {
  const { quantity, productId } = item;
  const productById = await Products.findById(productId);
  console.log(productId, quantity);
  console.log(quantity > productById.quantity);
  if(quantity > productById.quantity) throw({
    err: {
      'code': 'stock_problem',
      'message': 'Such amount is not permitted to sell'
    }
  });
};