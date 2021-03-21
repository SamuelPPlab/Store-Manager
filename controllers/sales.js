const express = require('express');
const routers = express.Router();

const { postBar, getBar, getBarId, putBarId } = require('../middleware/salesBar');

routers.post('/', postBar);
routers.get('/', getBar);
routers.get('/:id', getBarId);
routers.put('/:id', putBarId);

module.exports = routers;
