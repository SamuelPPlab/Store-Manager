const { Router } = require('express');

const router = Router();

const salesService = require('../services/salesService');
const status200 = 200;
const status404 = 404;
const status422 = 422;

router.post('/', async (req, res) => {
  const itensSold  = req.body;

  const result = await salesService.create(itensSold);

  if (result.err) return res.status(result.err.codeStatus)
    .json({ err: {
      code: result.err.code,
      message: result.err.message
    } });

  return res.status(status200).json(result);
});

router.get('/', async (req, res) => {
  const sales = await salesService.getAll();

  return res.status(status200).json({ sales });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const salesById = await salesService.getById(id);

  if (salesById.err) return res.status(status404).json(salesById);

  return res.status(status200).json(salesById);
});

router.put('/:id', async (req, res) => {
  const itensSold  = req.body;
  const { id } = req.params;

  const result = await salesService.upDate(id, itensSold);

  if (result.err) return res.status(result.err.codeStatus)
    .json({ err: {
      code: result.err.code,
      message: result.err.message
    } });
  
  return res.status(status200).json(result);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const result = await salesService.exclude(id);

  if (result.err) return res.status(status422).json(result);

  return res.status(status200).json(result);
});

module.exports = router;
