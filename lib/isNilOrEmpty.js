import { either, isEmpty, isNil } from 'ramda';

const isNilOrEmpty = either(isNil, isEmpty);

export default isNilOrEmpty;
