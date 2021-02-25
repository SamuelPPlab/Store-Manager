const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager'; // local
// const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager'; //evaluator

const connection = () => {
  return MongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db('StoreManager'))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

module.exports = connection;