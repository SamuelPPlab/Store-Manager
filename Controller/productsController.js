const productsService = require('../Service/productsService');
const { Router } = require('express');
const { validateNameSize, productAlreadyExits, quantityNotNegativeOrZero,
  quantityNotAString,
  validateId, wrongId } = require('../Middlewares/validationProducts');

const router = Router();
const Created = 201;
const OK = 200;

// Requisito-1 obs:Deve criar e retornar o objeto; 
router.post('/', validateNameSize, productAlreadyExits,
  quantityNotNegativeOrZero, quantityNotAString,
  async(req, res) => {
    const { name, quantity } = req.body;
    await productsService.createProductService(name, quantity);
  
    const newProduct = await productsService.productByNameService(name);
    return res.status(Created).json(newProduct);
  });

// Requisito-2 obs:listar os produtos,
// o endpoint deve ser acessível através do caminho (/products) ou (/products/:id);
router.get('/',async(req, res) => {
  const allProducts = await productsService.listProductsService();
  return res.status(OK).json({ products: allProducts });
});

router.get('/:id', validateId, async(req, res) => {
  const { id } = req.params;
  const product = await productsService.productByIdService(id);
  return res.status(OK).json(product);
});

// Requisito-3
router.put('/:id', validateNameSize,
  quantityNotNegativeOrZero, quantityNotAString, async(req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;

    await productsService.updateProductService(id, name, quantity);
    return res.status(OK).json({ _id: id, name, quantity });
  });

// Requisito-4
router.delete('/:id', validateId, wrongId, async(req, res) => {
  const { id } = req.params;
  const newProduct = await productsService.productByIdService(id);

  await productsService.deleteProductService(id);
  return res.status(OK).json(newProduct);
});  

module.exports = router;