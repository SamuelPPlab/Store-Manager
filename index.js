const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');
// const productController = require('./controllers/productController');
const ProductRoute = require('./Routes/ProductRoute');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const MONGO_DB_URL = 'mongodb://127.0.0.1:27017/';

mongoose
.connect(MONGO_DB_URL, {
  dbName: 'StoreManager',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
    console.log('Mongodb connected...')
  })

// não remova esse endpoint, e para o avaliador funcionar...
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', ProductRoute);

app.use((req, res, next) => {
  next(createError(404, 'not found'))
})

//Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))