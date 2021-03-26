const express = require('express');

const { status, errors , codeStatus } = require('../schemas/status');
const SaleServices = require('../services/saleService');
const { validateCreatedSale } = require('../middleware/saleMiddleware');

const routes = express.Router();

// Criação da venda
routes.post('/', validateCreatedSale, async (req, res) => {
  const itensSold = req.body;

  const newSale = await SaleServices.createSale(itensSold);

  return res.status(status.success).send(newSale);
});

// Lista todas as vendas 
routes.get('/', async (_req, resp) => {
  const allSales = await SaleServices.getAllSales();

  return resp.status(status.success).send(allSales);
});

// Lista vendas por ID
routes.get('/:id', async (req, res) => {
  const { id } = req.params;

  const idLength = 24;

  if (!id || id.length !== idLength) {
    return res.status(status.notFound)
      .json({ err: { code: codeStatus.notFound, message: errors.saleNotFound }});
  };
  
  const saleById = await SaleServices.findSaleById(id);
  
  if (!saleById) 
    return res.status(status.notFound)
      .json({ err: { code: codeStatus.notFound, message: errors.saleNotFound }});
  
  return res.status(status.success).send(saleById);
});

// Atualizar venda por ID
routes.put('/:id', validateCreatedSale, async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;

  await SaleServices.updateSale(id, itensSold);

  return res.status(status.success).json({ _id: id, itensSold });
});

// Remover venda por ID
routes.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const idLength = 24;

  if (id.length !== idLength ) return res.status(status.unprocessableEntity)
    .json({ err: { code: codeStatus.invalidData, message: errors.wrongSaleID }});

  const saleById = await SaleServices.findSaleById(id);

  if (!saleById) return res.status(status.notFound)
    .json({ err: { code: codeStatus.notFound, message: errors.saleNotFound }});
  
  await SaleServices.deleteSale(id);
  // vai rolar o teste? 
  return res.status(status.success).send(saleById);
});

module.exports = routes;
