const { ObjectId } = require('mongodb');
const salesServices = require('../../services/salesServices');

const UNPROCESSABLE_ENTITY = 422;

const deleteId = async (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    });
  }

  /* const foundId = await salesServices.findSalesById(id);

  if (!foundId) {
    return res.status(NOT_FOUND).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }
 */
  next();
};

module.exports = deleteId;
