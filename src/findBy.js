import {
  andThen, inc, pipe, uncurryN,
} from 'ramda';

import useCollection from './useCollection';
import dissolveFindParams from './internal/dissolveFindParams';

/**
 * It can be either direct `predicate` as it is expected in corresponding `mongodb` operation,
 * or it can be an `Array` in which the first element is the `predicate` and the second element is the `options`
 * to be passed to the corresponding `mongodb` operation.
 *
 * @typedef { T | Array<T> } FindParams<T>
 * */

/**
 * Takes a {@link MongoClientLike}, a database name, a collection name, and a predicate, then
 * returns `Promise` which resolves an `Array` of result that matches given predicate in specified `Collection`
 * in MongoDB.
 *
 * `predicate` should be as documented at
 * [here](http://mongodb.github.io/node-mongodb-native/3.5/reference/ecmascriptnext/crud/#read-methods)
 *
 * It is a curried function so it can be partially recomposed.
 * Since [Ramda](https://ramdajs.com/) is used for currying, you can also use [R.__](https://ramdajs.com/docs/#__)
 * placeholder to allow partial application of any combination of arguments of this particular function.
 *
 * @func findBy
 * @since v0.1.0
 * @param {MongoClientLike} client {@link MongoClient} instance
 * @param {string} databaseName Database name to get the collection from.
 * @param {string} collectionName Collection name to get find results in.
 * @param {FindParams<object>} predicate FindParams object that represents the query.
 * @return {Promise<Array>} Array of Document matching given predicate.
 * @see {@link findAll}, {@link createClient}
 * @example
 *
 *      const client = createClient(...params);
 *      findBy(client, 'databaseName', 'collectionName', { name: 'some name' })
 *        .then(console.log);
 *
 *      // partial re-usability
 *      const findCategoriesBy = findBy(someClient, 'someDb', 'categories');
 *      findCategoriesBy({ name: 'some name' }).then(console.log);
 *      findCategoriesBy({ approved: false }).then(console.log);
 *
 *      const findApproved = findBy(someClient, 'someDb', R.__, {approved: true})
 *      findApproved('categories').then(console.log);
 *      findApproved('articles').then(console.log);
 */
const findBy = uncurryN(
  inc(useCollection.length),
  pipe(
    useCollection,
    uncurryN(
      2,
      (collectionPromise) => (predicate) => andThen(
        (collection) => collection.find(...dissolveFindParams(predicate)).toArray(),
        collectionPromise,
      ),
    ),
  ),
);

export default findBy;
