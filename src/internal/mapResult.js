import {
  always, cond, curry, equals, map, omit, T, type,
} from 'ramda';

import {
  castDocId, docId, modelId, removeUndefinedId,
} from './id';
import isNilOrEmpty from './isNilOrEmpty';

export const mapResultWith = curry(
  (transform, result) => cond(
    [
      [isNilOrEmpty, always(() => null)],
      [equals('Array'), always(map(transform, result))],
      // else
      [T, always(transform(result))],
    ],
  )(type(result)),
);
export const toModel = mapResultWith((item) => ({ id: docId(item), ...omit(['_id'], item) }));
export const toDoc = mapResultWith(
  (item) => removeUndefinedId(
    {
      _id: castDocId(modelId(item)),
      ...omit(['id'], item),
    },
  ),
);
