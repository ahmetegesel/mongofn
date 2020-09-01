import { identity, memoizeWith } from 'ramda';
import { MongoClient } from 'mongodb';

/**
 * Default options to connect a Mongo Client.
 *
 * @type {object}
 * @constant
 * */
const DEFAULT_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/**
 * It can be either a connectionString as it is documented at official mongodb docs,
 * it can be a function that return `MongoClient` instance in a `Promise`, it can be `Promise` that resolves a `MongoClient`,
 * or it can simply be direct `MongoClient` instance.
 *
 * @typedef {(string|function<Promise<MongoClient>>|Promise<MongoClient>|MongoClient)} MongoClientLike
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
export const createClient = (
  connectionString,
  options = DEFAULT_OPTIONS
) => MongoClient.connect(connectionString, options);

/**
 * Connects to a MongoDB Client using given `connectionString` and `options`,
 * then returns a memoized {@link MongoClient} object which can be used to perform all kind of Client
 * operations that MongoDB Node.js Driver provides and it's initialized only once since it is memoized.
 *
 * `connectionString` value should be as documented at [Official Manual](docs.mongodb.org/manual/reference/connection-string/).
 *
 * `options` value should be as documented at
 * [Official Manual](http://mongodb.github.io/node-mongodb-native/3.5/reference/connecting/connection-settings/).
 *
 * @func createClient
 * @type function
 * @since v0.1.0
 * @param {string} connectionString Connection String.
 * @param {object} options Optional MongoDB Client settings.
 * @return {Promise} An Instance of MongoDB Client.
 * @example
 *
 * const useMainClient = useMemoizedClient(
 'mongodb://username:password@localhost:27017',
 {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
 );

 // below fns use the same instance of client all the time.
 // client is instantiated only once.
 const useDbInMainClient = useDb(useMainClient);
 useDbInMainClient('someDb').then(console.log);
 useDbInMainClient('someOtherDb').then(console.log);

 // say we want to close this client
 useMainClient().then(client => client.close());
 * */
export const useMemoizedClient = memoizeWith(identity, createClient);
