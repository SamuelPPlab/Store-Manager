const express = require('express');
const bodyParser = require('body-parser');

const productsController = require('./Controller/productsController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products/:id', productsController.getById);

app.use('/products', productsController.create);
app.use('/products', productsController.getAll);



app.listen(PORT, () => console.log(`Ouvindo a porta ${PORT}`));
