import { __ } from 'ramda';

const repeatPlaceholder = (n) => [...Array(n).keys()].map(() => __);

export default repeatPlaceholder;
