const express = require('express');
const app = express();
const port = 3000;
const FAIL = 500;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const ProductsController = require('./controller/ProductsController');
const SalesController = require('./controller/SalesController');
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use((req, _res, next) => {
  console.log({
    date: new Date(),
    method: req.method,
    endpoint: req.originalUrl,
  });
  next();
});

app.use('/', ProductsController);
app.use('/', SalesController);

app.use((err, _req, res, _next) => {
  console.log({ err });
  res.status(FAIL).json({ message: err.message });
});

app.listen(port);
