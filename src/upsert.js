import {
  andThen, head, ifElse, inc, pipe, prop, uncurryN,
} from 'ramda';

import useCollection from './useCollection';
import isNilOrEmpty from './internal/isNilOrEmpty';
import { docId, withoutId } from './internal/id';

/**
 * Handles the result of collection.insertOne in MongoDB Driver in a way that
 * it plucks the inserted document from the result.
 *
 * @func
 * @since v0.1.0
 * @param {object} cursorResult Cursor result of insertOne function.
 * @return {object} Inserted document.
 * */
const handleInsertOneResult = pipe(prop('ops'), head);

/**
 * Handles the result of collection.findOneAndUpdate in MongoDB Driver in a way that
 * it plucks the inserted document from the result.
 *
 * @func
 * @since v0.1.0
 * @param {object} cursorResult Cursor result of findOneAndUpdate function.
 * @return {object} Updated document.
 * */
const handleFindOneAndUpdateResult = prop('value');

/**
 * Takes a {@link MongoClientLike}, a database name, a collection name, and a doc to be upserted,
 * then returns `Promise` which resolves upserted `Document` in specified `Collection` in MongoDB.
 *
 * If `doc` has an _id field, then it will try to update it by finding the document with given id,
 * otherwise it will upsert the given `doc`
 *
 * It is a curried function so it can be partially recomposed.
 * Since [Ramda](https://ramdajs.com/) is used for currying, you can also use [R.__](https://ramdajs.com/docs/#__)
 * placeholder to allow partial application of any combination of arguments of this particular function.
 *
 * @func findBy
 * @since v0.1.0
 * @param {MongoClientLike} client {@link MongoClient} instance
 * @param {string} databaseName Database name to get the collection from.
 * @param {string} collectionName Collection name to get find results from.
 * @param {object} doc A Document to be upserted.
 * @return {Promise<Object>} Upserted document
 * @example
 *
 *      // complete usage
 *      // See createClient docs for more information
 *      const client = createClient(...params);
 *      const insertDocument = { name: 'some name', surname: 'some surname' };
 *      upsert(client, 'databaseName', 'collectionName', insertDocument)
 *      .then(console.log); // this should insert given document and returns inserted version
 *
 *      const updateDocument = {
 *        _id: 'id of the document',
 *        name: 'some updated name',
 *      };
 *      upsert(client, 'databaseName', 'collectionName', updateDocument)
 *      .then(console.log); // this should update given document and returns updated version
 *
 *      // partial reusability
 *      const upsertCategory = upsert(someCliemt, 'someDb', 'categories');
 *      upsertCategory({name: 'some name'}).then(doc => {});
 *      upsertCategory({_id: 'some id', approved: false}).then(doc => {});
 *
 *      const upsertInSomeDb = findBy(someCliemt, 'someDb')
 *      upsertInSomeDb('categories', {name: 'some name'}).then(category => {});
 *      upsertInSomeDb('comments', {_id: 'some id', approved: false}).then(comment => {});
 */
const upsert = uncurryN(
  inc(useCollection.length),
  pipe(
    useCollection,
    uncurryN(
      2,
      (collectionPromise) => (doc) => andThen(
        ifElse(
          () => isNilOrEmpty(docId(doc)),
          // insert when id is nil
          (collection) => andThen(handleInsertOneResult, collection.insertOne(doc)),
          // else update the document by finding it with its id
          (collection) => andThen(
            handleFindOneAndUpdateResult,
            collection.findOneAndUpdate(
              { _id: docId(doc) },
              { $set: withoutId(doc) },
              { upsert: true, returnOriginal: false },
            ),
          ),
        ),
        collectionPromise,
      ),
    ),
  ),
);

export default upsert;
