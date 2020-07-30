const mongodb = require('mongodb');
module.exports = {
    Client: mongodb.MongoClient,
    conxnURL: 'mongodb://localhost:27017',
    dbName: 'mern1db'
};