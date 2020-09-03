import findBy from './findBy';
import repeatPlaceholder from './internal/repeatPlaceholder';

/**
 * Takes a {@link MongoClientLike}, a database name, a collection name, then
 * returns `Promise` which resolves an `Array` of result that contains all records in specified `Collection`
 * in MongoDB.
 *
 * It is a curried function so it can be partially recomposed.
 * Since [Ramda](https://ramdajs.com/) is used for currying, you can also use [R.__](https://ramdajs.com/docs/#__)
 * placeholder to allow partial application of any combination of arguments of this particular function.
 *
 * @func findAll
 * @since v0.1.0
 * @param {MongoClientLike} client {@link MongoClient} instance
 * @param {string} databaseName Database name to get the collection from.
 * @param {string} collectionName Collection name to get find results in.
 * @return {Promise<Array>} Array of Documents matching given predicate.
 * @see {@link findBy}, {@link createClient}
 * @example
 *
 *      const client = createClient(...params);
 *      findAll(client, 'databaseName', 'collectionName')
 *      .then(console.log);
 *
 *      // partial re-usability
 *      const findAllIn = findAll(someClient, 'someDb');
 *      findAllIn('categories').then(console.log);
 *      findAllIn('articles').then(console.log);
 *
 */
const findAll = findBy(...repeatPlaceholder(findBy.length), {});

export default findAll;
