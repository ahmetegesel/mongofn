import {
  always, cond, curry, equals, map, omit, T, type,
} from 'ramda';

import {
  castDocId, docId, modelId, removeUndefinedId,
} from './id';
import isNilOrEmpty from './isNilOrEmpty';

export const mapResultWith = curry(
  (transform, result) => {
    if (isNilOrEmpty(result)) {
      return null;
    }

    return cond(
      [
        [equals('Array'), always(map(transform, result))],
        // else
        [T, always(transform(result))],
      ],
    )(type(result));
  },
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

export function isResultWithoutCount(value) {
  return !Array.isArray(value[0]);
}

export function toModelWithCount(value) {
  if (!isResultWithoutCount(value)) {
    return [toModel(value[0]), value[1]];
  }

  return toModel(value);
}
