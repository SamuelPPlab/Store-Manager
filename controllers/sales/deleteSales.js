const { sales } = require('../../services');
const { status } = require('../../utils/dictionary');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;  
    const sale = await sales.deleteSale(id);
    return res.status(status.ok).json(sale);
  } catch (err) {
    return next(err);
  }
};
