const { postSale } = require('../models/storeModel');

const newSale = async (sale) => {
  return postSale(sale);
};

module.exports = {
  newSale,
};