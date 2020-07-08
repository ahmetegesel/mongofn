import {
  andThen, head, ifElse, pipe, prop, uncurryN,
} from 'ramda';
import useCollection from './useCollection';
import { isNilOrEmpty } from '../../gql-functional/lib/utils/isNilOrEmpty';
import { docId, withoutId } from '../lib/id';

export const handleInsertOneResult = pipe(prop('ops'), head);
export const handleFindOneAndUpdateResult = prop('value');

const upsert = uncurryN(
  3,
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
