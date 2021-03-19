const express = require('express');
const productRouter = require('./routes/productsRoutes');
const saleRouter = require('./routes/salesRoutes');
const bodyParser = require('body-parser');
const { sendError } = require('./utils/handleError');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRouter);
app.use('/sales', saleRouter);
app.use((err, _req, res, _next) => {
  sendError(err, res);
});

app.listen(PORT);
