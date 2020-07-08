import { identity, memoizeWith } from 'ramda';
import { MongoClient } from 'mongodb';

/**
 * Default options to connect a Mongo Client.
 *
 * @type {object}
 * @constant
 * */
export const DEFAULT_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/**
 * It can be either a function that return `MongoClient` instance
 * in a `Promise`, or it can be `Promise` that resolves a `MongoClient`,
 * or else it can be direct `MongoClient` instance.
 *
 * @typedef {(function<Promise<MongoClient>>|PromisePromise<MongoClient>|MongoClient)} MongoClientLike
 * */

/**
 * Connects to a MongoDB Client using given `connectionString` and `options`,
 * then returns {@link MongoClient} object which can be used to perform all kind of Client
 * operations that MongoDB Node.js Driver provides.
 *
 * `connectionString` value should be as documented at [Official Manual](docs.mongodb.org/manual/reference/connection-string/).
 *
 * `options` value should be as documented at
 * [Official Manual](http://mongodb.github.io/node-mongodb-native/3.5/reference/connecting/connection-settings/).
 *
 * Note that the client instance is cached by memoization of this function using
 * [memoizeWith](https://ramdajs.com/docs/#memoizeWith).
 *
 * @func createClient
 * @type function
 * @since v0.1.0
 * @param {string} connectionString Connection String.
 * @param {object} options Optional MongoDB Client settings.
 * @return {Promise} An Instance of MongoDB Client.
 * @example
 *
 * createClient(
 'mongodb://username:password@localhost:27017',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
 ).then(client => {
    return client.db('dbName').collection('collectionName');
  }
 )
 *
 */
const createClient = memoizeWith(identity, ((connectionString, options = DEFAULT_OPTIONS) => MongoClient.connect(connectionString, options)));

export default createClient;
