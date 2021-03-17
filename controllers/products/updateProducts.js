const { products } = require('../../services');
const { status } = require('../../utils/dictionary');

module.exports = async (req, res, next) => {
  try {
    const { body, params: { id } } = req;  
    const product = await products.updateProduct(id, body);
    return res.status(status.ok).json(product);
  } catch (err) {
    return next(err);
  }
};
