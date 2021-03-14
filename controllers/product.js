const express = require('express');
const routers = express.Router();

const { postBar } = require('../middleware/productsBar');

routers.post('/', postBar );
// routers.get('/',);

module.exports = routers;