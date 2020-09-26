import { head, nth } from 'ramda';

import { isArray } from './type';

/**
 * Since find methods in MongoDB allows some options and other params to shape the query
 * we are sending to the client, this particular function is making sure that it returns
 * an array even if user only passed the predicate. If user passes an array, then it means
 * `params` contains options and/or other params for the find method. */
const dissolveFindParams = (params) => (isArray(params) ? {
  query: head(params),
  ...nth(1, params),
} : {
  query: params,
});

export default dissolveFindParams;
