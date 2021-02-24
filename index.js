const express = require('express');
const app = express();
const PORT = 3000;

const bodyParser = require('body-parser');
const productsController = require('./controller/productsController');
const salesController = require('./controller/salesController');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(bodyParser.json());
app.use('/products', productsController);
app.use('/sales', salesController);

app.listen(PORT, () => console.log(`Listening to PORT ${PORT}`));