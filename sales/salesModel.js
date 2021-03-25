const { ObjectId } = require('mongodb');

const productsModel = require('../products/productsModel');

const connection = require('../connection');

const ZERO = 0;

const createSale = async (sales) => {
  console.log('model - sales');
  sales.forEach(async (sale) => {
    const product = await productsModel.findById(sale.productId);
    // quantidade atual em estoque do produto:
    const oldQuantity = product.quantity;
    // se a subtração der menor que zero deve retornar erro
    if (oldQuantity - sale.quantity >= ZERO) {
      productsModel.updateQuantityProduct(sale.productId, (oldQuantity - sale.quantity));
    } else return { err: {
      code: 'stock_problem', message: 'Such amount is not permitted to sell'
    } };
  });
  const { insertedId } =  await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sales }));
  return { _id: insertedId, itensSold: sales };
};

const getAllSales = async () => {
  const allSales = await connection()
    .then((db) => db.collection('sales').find().toArray());
  return allSales;
};

const findByIdSale = async (id) => {
  const saleById = await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));
  return saleById;
};


const updateSale = async (id, sales) => {
  // parte de atualizar a venda ainda falta refazer mas comparando o valor//
  // da quantidade da venda antigo com o atual e só então decidir se vai somar ou subtrair

  // recuperando o objeto da venda para ter as quantitdades antigas dessa venda
  // const responseSale = await findByIdSale(id);
  // console.log('RESPONSE SALES MODEL', responseSale);
  // const objectsSales = responseSale.itensSold;
  // objectsSales.forEach(async (sale) => {
  //   const product = await productsModel.findById(sale.productId);
  //   // quantidade atual em estoque do produto:
  //   const oldQuantity = product.quantity;
  //   if(oldQuantity > sale.quantity) {
  //     productsModel.updateQuantityProduct(sale.productId, (oldQuantity - sale.quantity));
  //   } else {
  //     productsModel.updateQuantityProduct(sale.productId, (oldQuantity + sale.quantity));
  //   }
  // });
  await connection()
    .then((db) => db.collection('sales').updateOne(
      {_id: ObjectId(id)}, {$set: {itensSold: sales}}
    ));
  return { _id: id, itensSold: sales };
};

const deleteSale = async (id) => {
  const responseSale = await findByIdSale(id);
  console.log('RESPONSE SALES MODEL', responseSale);
  const sales = responseSale.itensSold;
  console.log('SALES salesModel ', sales);
  sales.forEach(async (sale) => {
    const product = await productsModel.findById(sale.productId);
    const oldQuantity = product.quantity;
    productsModel.updateQuantityProduct(sale.productId, (oldQuantity + sale.quantity));
  });
  const deletedSale = await connection()
    .then((db) => db.collection('sales').deleteOne({_id: ObjectId(id)}));
  return deletedSale;
};

module.exports = {
  createSale,
  getAllSales,
  findByIdSale,
  updateSale,
  deleteSale,
};
