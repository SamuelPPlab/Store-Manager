const express = require('express');
const bodyParser = require('body-parser');

const products = require('./controllers/product');

const app = express();
// const SUCCESS = 200;
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(bodyParser.json());

app.use('/products', products);

app.listen(PORT, console.log(`funcionando na porta "${PORT}"`));
