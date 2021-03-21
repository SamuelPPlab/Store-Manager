const {
  serviceInsertSales,
} = require('../service/serviceSales');

const SUCCESS = 200;
const SUCCESS_INSERTED = 201;
const UNPROCESSABLE = 422;
const codeType = 'invalid_data';

const {
  validateId,
  validateQuantityType,
  validateQuantitylargeThanZero,

} = require('../controllers/validate/validate');

const postBar = async (req, res) => {
  const { productId, quantity } = req.body[0];
  const valId = validateId;
  const valQuantLarge = validateQuantitylargeThanZero;
  const valQuantType = validateQuantityType;
  if (
    valId(productId) === false
    || valQuantLarge(quantity) === false
    || valQuantType(quantity) ===false
  ) {
    return res.status(UNPROCESSABLE).json({
      err: {
        code: codeType,
        message: 'Wrong product ID or invalid quantity',
      }
    });
  } else {
    const { ops } = await serviceInsertSales(req.body);
    return res.status(SUCCESS).json(ops[0]);
  } 
};

module.exports = {
  postBar,
};