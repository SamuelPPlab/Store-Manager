const { ObjectId } = require('mongodb');
const salesServices = require('../../services/salesServices');

const NOT_FOUND = 404;

const validateId = async (req, res, next) => {
  const { id } = req.params;

  if(!ObjectId.isValid(id)) {
    return res.status(NOT_FOUND).json({
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }
    });
  };

  const foundId = await salesServices.findSalesById(id);

  if(!foundId) {
    return res.status(NOT_FOUND).json({
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }
    });
  };

  next();
};

module.exports = validateId;
