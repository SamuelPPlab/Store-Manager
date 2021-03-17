const { sales } = require('../../services');
const { status } = require('../../utils/dictionary');

module.exports = async (req, res, next) => {
  try {
    const { body } = req;  
    const newSale = await sales.createSale(body);
    return res.status(status.ok).json(newSale);
  } catch (err) {
    return next(err);
  }
};
