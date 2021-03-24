const express = require('express');

const routerProducts = require('./products/routerProducts');

const routerSales = require('./sales/routerSales');

const app = express();

// tive problemas com o uso do bodyParser, acusando estar depreciado, então seguindo
// uma thread aberta pelo Luiz Simões estou usando o express.json()
app.use(express.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', routerProducts);

app.use('/sales', routerSales);

app.listen(PORT, () => console.log('Esperando requisições na porta', PORT));
