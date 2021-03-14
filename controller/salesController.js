const { Router } = require('express');
const { newSale } = require('../service/SalesServices');

const router = Router();
const SUCCESS = 200;
const UNPROCESSABLE_ENTITY = 422;

const err = {
  status: UNPROCESSABLE_ENTITY,
  message: '',
};

router.post('/', 
  async (req, res, next) => {
    const bodyInitial = req.body;
    if (bodyInitial.some((item) => 
      typeof item.quantity === 'string' || item.quantity < 1)) {
      err.message = 'Wrong product ID or invalid quantity';
      return next(err);
    }
    const createSale = await newSale(bodyInitial);
    return res.status(SUCCESS).json(createSale);
  }
);

module.exports = router;