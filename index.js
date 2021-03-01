const express = require('express');
const ProductController = require('./src/controllers/ProductController');
const bodyParser = require('body-parser');
const { v } = require('./variables');

const app = express();

app.use(bodyParser.json());

app.use('/products', ProductController);

// não remova esse endpoint, e para o avaliador funcionar 
app.get('/', (_request, response) => {
  response.send();
});

// middleware de erro
app.use((err, req, res, next) => {
  return res.status(v.INTERNAL_ERROR).json({ message: 'Erro interno' });
});

app.listen(v.PORT, () => {
  console.log(`Listening on ${v.PORT}`);
});
