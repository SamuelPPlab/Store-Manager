const express = require('express');
const routers = express.Router();

const { postBar, getBar, getBarId } = require('../middleware/productsBar');

routers.post('/', postBar);
routers.get('/', getBar);
routers.get('/:id', getBarId);

module.exports = routers;