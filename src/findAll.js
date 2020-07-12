import findBy from './findBy';
import repeatPlaceholder from './internal/repeatPlaceholder';
import findByObjectId from './findByObjectId';

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
 * @param {string} collectionName Collection name to get find results from.
 * @return {Promise<Array>} Array of Document matching given predicate.
 * @see {@link findBy}, {@link createClient}
 * @example
 *
 *      // complete usage
 *      // See createClient docs for more information
 *      const client = createClient(...params);
 *      findBy(client, 'databaseName', 'collectionName')
 *      .then(console.log);
 *
 *      // partial reusability
 *      const findAllOf = findBy(someCliemt, 'someDb');
 *      findAllOf('categories').then(categories => {});
 *      findAllOf('articles').then(articles => {});
 *
 */
const findAll = findBy(...repeatPlaceholder(findBy.length), {});

export default findAll;

findByObjectId('mongodb://root:rootpassword@localhost:27017', 'pho', 'users', ['5efe5a9fbcf2ff75ac160aa0', {
  projection: {
    _id: 0,
    name: 1,
  },
}]).then(console.log);
