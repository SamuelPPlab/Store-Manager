const { MongoClient } = require('mongodb');

// const MONGO_DB_URL = 'mongodb://mongodb:27017';
const MONGO_DB_URL = 'mongodb://localhost:27017';
const DATABASE = 'StoreManager';

const connection = async () => {
  return await MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then((conn) => conn.db(DATABASE))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

module.exports = connection;