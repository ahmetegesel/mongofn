import {
  andThen, head, ifElse, inc, pipe, prop, uncurryN,
} from 'ramda';

import useCollection from './useCollection';
import isNilOrEmpty from './internal/isNilOrEmpty';
import { docId, withoutId } from './internal/id';

/**
 * Handles the result of collection.insertOne in MongoDB Driver in a way that
 * it picks only the inserted document from the result.
 *
 * @func
 * @since v0.1.0
 * @param {object} cursorResult Cursor result of insertOne function.
 * @return {object} Inserted document.
 * */
const handleInsertOneResult = pipe(prop('ops'), head);

/**
 * Handles the result of collection.findOneAndUpdate in MongoDB Driver in a way that
 * it picks only the inserted document from the result.
 *
 * @func
 * @since v0.1.0
 * @param {object} cursorResult Cursor result of findOneAndUpdate function.
 * @return {object} Updated document.
 * */
const handleFindOneAndUpdateResult = prop('value');

/**
 * Takes a {@link MongoClientLike}, a database name, a collection name, and a doc to be upserted,
 * then returns `Promise` which resolves upserted `Document` in specified `Collection`.
 *
 * If `doc` has an _id field, then it will try to update it by finding the document with given id,
 * otherwise it will upsert the given `doc`.
 *
 * It is a curried function so it can be partially recomposed.
 * Since [Ramda](https://ramdajs.com/) is used for currying, you can also use [R.__](https://ramdajs.com/docs/#__)
 * placeholder to allow partial application of any combination of arguments of this particular function.
 *
 * @func findBy
 * @since v0.1.0
 * @param {MongoClientLike} client {@link MongoClient} instance
 * @param {string} databaseName Database name to get the collection from.
 * @param {string} collectionName Collection name to upsert the document in.
 * @param {object} doc The Document to be upserted.
 * @return {Promise<Object>} Upserted document
 * @example
 *
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
 *      // partial re-usability
 *      const upsertCategory = upsert(client, 'someDb', 'categories');
 *      upsertCategory({ name: 'some name' }).then(console.log);
 *      upsertCategory({ _id: 'some id', approved: false }).then(console.log);
 *
 *      const upsertInSomeDb = findBy(client, 'someDb')
 *      upsertInSomeDb('categories', { name: 'some name' }).then(console.log);
 *      upsertInSomeDb('comments', { _id: 'some id', approved: false }).then(console.log);
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
