import { MongoClient } from 'mongodb';

import { createClient, useMemoizedClient } from '../src';
import { DEFAULT_OPTIONS } from '../src/client';

jest.mock('mongodb', () => ({
  ...jest.requireActual('mongodb'),
  MongoClient: {
    connect: jest.fn(),
  },
}));

describe('client tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const sampleClient = {};
  MongoClient.connect.mockResolvedValue(sampleClient);

  describe('createClient tests', () => {
    it('should return a client instance using MongoClient.connect', async () => {
      expect.assertions(3);

      const connectionString = 'connectionString';
      const options = {};

      MongoClient.connect.mockImplementationOnce((...args) => {
        expect(args[0]).toBe(connectionString);
        expect(args[1]).toBe(options);

        return Promise.resolve(sampleClient);
      });

      const client = await createClient(connectionString, options);

      expect(client).toBe(sampleClient);
    });

    it('should use DEFAULT_OPTIONS when no options parameter is provided', async () => {
      expect.assertions(3);

      const connectionString = 'connectionString';

      MongoClient.connect.mockImplementationOnce((...args) => {
        expect(args[0]).toBe(connectionString);
        expect(args[1]).toBe(DEFAULT_OPTIONS);

        return Promise.resolve(sampleClient);
      });

      const client = await createClient(connectionString, undefined);

      expect(client).toBe(sampleClient);
    });
  });

  describe('useMemoizedClient tests', () => {
    it('should be memoized', async () => {
      expect.assertions(2);

      const connectionString = 'connectionString';
      const options = {};

      const client1 = await useMemoizedClient(connectionString, options);
      const client2 = await useMemoizedClient(connectionString, options);

      expect(client1).toBe(client2);
      expect(MongoClient.connect).toBeCalledTimes(1);
    });
  });
});
