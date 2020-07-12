import {
  complement,
  equals, flip, pipe, type, uncurryN,
} from 'ramda';

export const isTypeOf = flip(uncurryN(2, pipe(type, equals)));
export const isNotTypeOf = complement(isTypeOf);
export const isError = isTypeOf('Error');
export const isFunction = isTypeOf('Function');
export const isPromise = isTypeOf('Promise');
export const isString = isTypeOf('String');
export const isArray = isTypeOf('Array');
