import { castDocId, validateObjectId } from "../src/internal/id";

describe('id tests', () => {
    it('should return id if id is not a valid object id', async () => {
        const id = castDocId('piripiripiri');
        const idValidation = validateObjectId('piripiripiri');

        const id2 = castDocId('123456789101');
        const id2Validation = validateObjectId('123456789101');

        const id3 = castDocId('a8e4d5f9w8v5');
        const id3Validation = validateObjectId('a8e4d5f9w8v5');

        const id4 = castDocId('594ced02ed345b2b049222c5');
        const id4Validation = validateObjectId('594ced02ed345b2b049222c5');

        expect(id).toEqual('piripiripiri');
        expect(id2).toEqual('123456789101');
        expect(id3).toEqual('a8e4d5f9w8v5');
        expect(JSON.stringify(id4)).toEqual(JSON.stringify('594ced02ed345b2b049222c5'));
        expect(idValidation).toEqual(false);
        expect(id2Validation).toEqual(false);
        expect(id3Validation).toEqual(false);
        expect(id4Validation).toEqual(true);
    });
});
