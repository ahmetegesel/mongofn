import {
  always, cond, curry, equals, map, omit, type,
} from 'ramda';

import {
  castDocId, docId, modelId, removeUndefinedId,
} from './internal/id';

export const mapResultWith = curry(
  (transform, result) => cond(
    [
      [equals('Array'), always(map(transform, result))],
      [equals('Object'), always(transform(result))],
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
