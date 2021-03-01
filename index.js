const express = require('express');
const ProductController = require('./src/controllers/ProductController');
const bodyParser = require('body-parser');
require('dotenv').config({ path: './process.env' });

const app = express();

app.use(bodyParser.json());

app.use('/', ProductController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// middleware de erro
app.use((err, req, res, next) => {
  res.status(process.env.internalError).json({ message: 'Erro interno' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
