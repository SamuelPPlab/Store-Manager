const express = require('express');
const routers = express.Router();

const {
  postBar,
  getBar,
  getBarId,
  putBarId,
  deleteBarId,
} = require('../middleware/salesBar');

routers.post('/', postBar);
routers.get('/', getBar);
routers.get('/:id', getBarId);
routers.put('/:id', putBarId);
routers.delete('/:id', deleteBarId);

module.exports = routers;
