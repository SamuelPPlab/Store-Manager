const express = require('express');
const routers = express.Router();

const { postBar } = require('../middleware/salesBar');

routers.post('/', postBar);

module.exports = routers;
