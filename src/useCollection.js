import { andThen, inc, pipe, uncurryN } from 'ramda';
import useDatabase from './useDatabase';
import createClient from './createClient';

/**
 * Takes a {@link MongoClientLike}, a database name, and a collection name, then returns `Promise` which resolves
 * [MongoDB Collection Object](http://mongodb.github.io/node-mongodb-native/3.5/api/Collection.html).
 *
 * It returns the original MongoDB {@link Collection} object so it can be used to perform
 * all kind of Collection operations that MongoDB Node.js Driver provides.
 *
 * It is a curried function so it can be partially recomposed.
 * Since [Ramda](https://ramdajs.com/) is used for currying, you can also use [R.__](https://ramdajs.com/docs/#__)
 * placeholder to allow partial application of any combination of arguments of this particular function.
 *
 * @func useCollection
 * @since v0.1.0
 * @param {MongoClientLike} client {@link MongoClient} instance
 * @param {string} databaseName Database name to get the collection from.
 * @param {string} collectionName Collection name.
 * @return {Promise<Collection>} MongoDB Collection.
 * @see {@link useDatabase}, {@link createClient}
 * @example
 *
 *      // complete usage
 *      // See createClient docs for more information
 *      const client = createClient(...params);
 *
 *      useCollection(client, 'databaseName', 'collectionName').then(collection => {
 *        return collection.find({}).toArray();
 *      });
 *
 *      // partial reusability
 *      const useCollectionInSomeDb = useCollection(someClient, 'someDb');
 *      useCollectionInSomeDb('someCollection').then(collection => {});
 *      useCollectionInSomeDb('someOtherCollection').then(collection => {});
 *
 *      const useSomeCollectionIn = useCollection(someClient, R.__, 'someCollection');
 *      useSomeCollectionIn('someDb').then(collection => {});
 *      useSomeCollectionIn('someOtherDb').then(collection => {});
 */
const useCollection = uncurryN(
  inc(useDatabase.length),
  pipe(
    useDatabase,
    uncurryN(2, (dbPromise) => (collectionName) => andThen((db) => db.collection(collectionName), dbPromise)),
  ),
);

export default useCollection;
