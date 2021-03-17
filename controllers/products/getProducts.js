const { products } = require('../../services');
const { status } = require('../../utils/dictionary');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;  
    const productsList = await products.getProducts(id);
    return res.status(status.ok).json(productsList);
  } catch (err) {
    return next(err);
  }
};
