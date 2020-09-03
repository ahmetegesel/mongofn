import useDb from '../src/useDb';
import { createClient } from '../src/client';

jest.mock('../src/client');

describe('useDb tests', () => {
  const sampleClient = {
    db: jest.fn(),
  };
  const dbName = 'dbName';
  const sampleDb = {};

  createClient.mockResolvedValue(sampleClient);
  sampleClient.db.mockResolvedValue(sampleDb);

  it('should use given client instance that is passed as client parameter', async () => {
    expect.assertions(1);

    const db = await useDb(sampleClient, dbName);

    expect(db).toBe(sampleDb);
  });

  it('should use given promise that is passed as client parameter to get a client', async () => {
    expect.assertions(1);

    const client = Promise.resolve(sampleClient);

    const db = await useDb(client, dbName);

    expect(db).toBe(sampleDb);
  });

  it('should use given fn that is passed as client parameter to get a client', async () => {
    expect.assertions(3);

    const clientFn = jest.fn().mockResolvedValueOnce(sampleClient);

    const db = await useDb(clientFn, dbName);

    expect(clientFn).toBeCalledTimes(1);
    expect(db).toBe(sampleDb);
    expect(sampleClient.db).toBeCalledWith(dbName);
  });

  it('should use createClient when given client parameter is a string', async () => {
    expect.assertions(2);

    const connectionString = 'connectionString';

    const db = await useDb(connectionString, dbName);

    expect(db).toBe(sampleDb);
    expect(createClient).toBeCalled();
  });
});
