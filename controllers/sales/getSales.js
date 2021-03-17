const { sales } = require('../../services');
const { status } = require('../../utils/dictionary');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;  
    const salesList = await sales.getSales(id);
    return res.status(status.ok).json(salesList);
  } catch (err) {
    return next(err);
  }
};
