import useCollection from '../src/useCollection';
import findBy from '../src/findBy';

jest.mock(
  '../src/useCollection',
  // eslint-disable-next-line no-unused-vars
  () => jest.fn((client, dbName, collectionName) => {}),
);

describe('findBy tests', () => {
  const connectionString = 'connectionString';
  const dbName = 'dbName';
  const collectionName = 'collectionName';

  const toArray = jest.fn();
  const sampleCollection = {
    find: jest.fn().mockReturnValue({
      toArray,
      count: jest.fn(),
    }),
  };
  useCollection.mockResolvedValue(sampleCollection);

  it('should find the data in the collection by given predicate', async () => {
    const predicate = {};
    const emptyOptions = {};

    const expectedResult = ['test'];
    toArray.mockReturnValue(expectedResult);

    const result = await findBy(connectionString, dbName, collectionName, predicate);

    expect(result).toBe(expectedResult);
    expect(sampleCollection.find).toBeCalledWith(predicate, emptyOptions);
  });

  it('should also pass options parameter to collection.find when it is given in predicate parameter', async () => {
    const options = {};
    const predicate = {};

    await findBy(connectionString, dbName, collectionName, [predicate, options]);

    expect(sampleCollection.find).toBeCalledWith(predicate, options);
  });
});
