const { products } = require('../../services');
const { status } = require('../../utils/dictionary');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;  
    const product = await products.deleteProduct(id);
    return res.status(status.ok).json(product);
  } catch (err) {
    return next(err);
  }
};
