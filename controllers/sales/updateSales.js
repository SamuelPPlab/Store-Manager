const { sales } = require('../../services');
const { status } = require('../../utils/dictionary');

module.exports = async (req, res, next) => {
  try {
    const { body, params: { id } } = req;  
    const sale = await sales.updateSale(id, body);
    return res.status(status.ok).json(sale);
  } catch (err) {
    return next(err);
  }
};
