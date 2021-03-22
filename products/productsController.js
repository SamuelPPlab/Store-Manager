const productsService = require('./productsService');

const SUCCESS = 201;
const ERROR = 422;

const createProduct = async (req, res) => {
  console.log('controller - products');
  const { name, quantity } = req.body;
  console.log(name, quantity);

  const { code, createdProduct, err } = await
  productsService.createProduct(name, quantity);

  console.log('code NO CONTROLLER', code);
  console.log('insertedProductInfos NO CONTROLLER', createdProduct);
  console.log('err NO CONTROLLER', err);

  if (err) return res.status(ERROR).json({err});

  res.status(code).json(createdProduct);
};

module.exports = {
  createProduct,
};
