import { ifElse, pipe, toString } from 'ramda';
import { isError } from './type';

const throwError = ifElse(
  isError,
  (err) => throw err,
  pipe(toString, (message) => throw new Error(message)),
);

export default throwError;
