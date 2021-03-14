const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controller/productsController');
const salesController = require('./controller/salesController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/products', productsController);

app.use('/sales', salesController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();

});

let errorMessage = { 
  'err': {
    'code': 'invalid_data',
    'message': ''
  }
};

app.use((err, _req, res, _next) => {
  const { status, message, code } = err;
  errorMessage.err.code = code;
  errorMessage.err.message = message;
  return res.status(status).json(errorMessage);
});

app.listen(PORT, () => console.log('Tô na porta 3000'));
