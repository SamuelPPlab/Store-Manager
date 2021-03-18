
const { products } = require('../../services');
const { status } = require('../../utils/dictionary');

module.exports = async (req, res, next) => {
  try {
    const { body } = req;  
    const newProduct = await products.createProducts(body);
    return res.status(status.created).json(newProduct);
  } catch (err) {
    return next(err);
  }
};
