const SalesModel = require('../models/SalesModel');
const ProductsModel = require('../models/ProductsModel');
const itemValidation = require('../middleware/ItemsValidation');
const { Router } = require('express');

const SalesRouter = Router();
const OK = 200, CREATED = 201 , NOT_FOUND = 404, UNPROCESSABLE_ENTITY = 422;
const ZERO = 0;

SalesRouter.post('/', async (req, res) => {
  const itensSold = req.body;
  const checkBadData = itensSold.some((item) => {
    const product = ProductsModel.getById(item.productId);
    return (!product || item.quantity <= ZERO || typeof item.quantity !== 'number');
  });
  if (checkBadData) {
    const errorInfo = {
      message: 'Wrong product ID or invalid quantity',
      code: 'invalid_data'
    };
    return res.status(UNPROCESSABLE_ENTITY)
      .json({ err: errorInfo });
    
  }

  const forLoop = async () => {
    for (let i = ZERO; i < itensSold.length; i += 1) {
      const product = await ProductsModel.getById(itensSold[i].productId);
      if (product) {
        if (product.quantity >= itensSold[i].quantity) {
          const newProduct = {
            _id: itensSold[i].productId,
            name: product.name,
            quantity: product.quantity - itensSold[i].quantity,
          };
          await ProductsModel.update(newProduct);
        } else {
          const errorInfo = {
            message: 'Such amount is not permitted to sell',
            code: 'stock_problem'
          };
          return res.status(NOT_FOUND)
            .json({ err: errorInfo });
        }
      }
    }
    const { _id } = await SalesModel.create(itensSold);
    return res.status(OK).send({ _id, itensSold });
  };
  forLoop();
});

SalesRouter.get('/', async (_req, res) => {
  const sales = await SalesModel.getAll();
  return res.status(OK).json({ sales });
});

SalesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await SalesModel.getById(id);
  if (!sale) {
    const errorInfo = {
      message: 'Sale not found',
      code: 'not_found'
    };
    return res.status(NOT_FOUND).json({ err: errorInfo });
  }
  return res.status(OK).json(sale);
});

SalesRouter.put('/:id', itemValidation, async (req, res) => {
  const itensSold = req.body;
  const { id } = req.params;
  await SalesModel.update(id, itensSold);
  return res.status(OK).json({ _id: id, itensSold });
});

SalesRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await SalesModel.getById(id);
    if (!sale) {
      const errorInfo = {
        message: 'Wrong sale ID format',
        code: 'invalid_data'
      };
      return res.status(UNPROCESSABLE_ENTITY).json({ err: errorInfo });
    }
  } catch (err) {
    const errorInfo = {
      message: 'Wrong sale ID format',
      code: 'invalid_data' 
    };
    return res.status(UNPROCESSABLE_ENTITY).json({ err: errorInfo });
  } finally {
    const { id } = req.params;
    const sale = await SalesModel.getById(id);


    const anotherLoop = async () => {
      for (let i = ZERO; i < sale.itensSold.length; i += 1) {
        console.log(sale);
        const product = await ProductsModel.getById(sale.itensSold[i].productId);
        console.log(product);
        const anotherNewProduct = {
          _id: sale.itensSold[i].productId,
          name: product.name,
          quantity: sale.itensSold[i].quantity + product.quantity,
        };
        await ProductsModel.update(anotherNewProduct);
      }
    };
    anotherLoop();
    await SalesModel.delById(sale._id);
    return res.status(OK).json();
  }
});

module.exports = SalesRouter;
