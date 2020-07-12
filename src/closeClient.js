import createClient from './createClient';

/**
 * Closes client connection. Since {@link createClient} is a memoized function,
 * it accepts the same arguments that {@link createClient} accepts, so that
 * it can get the same client to close the connection.
 *
 * @func closeClient
 * @type function
 * @since v0.5.0
 * @param {string} connectionString Connection String.
 * @param {object} options Optional MongoDB Client settings.
 * @return {Promise} A void Promise.
 * @example
 *
 *      const { createClient, closeClient } = require('mongofn');
 *
 *      const connectionString = '....';
 *      const options = {};
 *
 *      const client = createClient(connectionString, options);
 *      findBy(client, 'databaseName', 'collectionName', {name: 'some name'})
 *      .then(console.log);
 *
 *      closeClient(connectionString, options);
 */
const closeClient = (connectionString, options = undefined) => createClient(connectionString, options)
  .then((client) => client.close());

export default closeClient;
