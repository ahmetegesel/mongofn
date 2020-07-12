import { isArray } from './type';

const dissolveFindParams = (params) => (isArray(params) ? params : [params]);

export default dissolveFindParams;
