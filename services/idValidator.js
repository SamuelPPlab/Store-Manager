const { ObjectId } = require('mongodb');

const idValidator = (id) => (ObjectId.isValid(id));

module.exports = idValidator;
