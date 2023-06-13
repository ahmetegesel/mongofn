import {
  isNil, omit, pipe, prop, when
} from 'ramda';
import { ObjectId } from 'mongodb';

export const docId = prop('_id');
export const modelId = prop('id');
export const castDocId = (id) => {
  if (typeof id === 'number') {
    return id;
  }

  return when(validateObjectId, () => new ObjectId(id))(id);
};
export const validateObjectId = (id) => {
  if(ObjectId.isValid(id)){
    return (String)(new ObjectId(id)) === id;

  }
  return false;
};
export const withoutId = omit(['_id']);
export const removeUndefinedId = when(pipe(docId, isNil), omit(['_id']));
