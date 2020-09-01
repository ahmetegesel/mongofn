import useDb from '../src/useDb';
import useCollection from '../src/useCollection';

// eslint-disable-next-line no-unused-vars
jest.mock('../src/useDb', () => jest.fn((client, dbName) => {}));

describe('useCollection tests', () => {
  it('should return collection with given collectionName', async () => {
    const sampleCollection = {};
    const sampleDb = {
      collection: jest.fn().mockReturnValue(sampleCollection),
    };

    useDb.mockResolvedValue(sampleDb);

    const connectionString = 'connectionString';
    const dbName = 'sampleDb';
    const collectionName = 'sampleCollection';

    const collection = await useCollection(connectionString, dbName, collectionName);

    expect(sampleDb.collection).toBeCalledWith(collectionName);
    expect(collection).toBe(sampleCollection);
  });
});
