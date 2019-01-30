import {db} from './helpers/db';
import {logger} from './helpers/logger';
import {Server} from './server';

db.authenticate()

    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });

(async () => {
  await Server.init();
  await Server.start();
})();

process.on('SIGINT', () => {
  logger.info('Stopping hapi server');

  Server.stop().then((err) => {
    logger.info(`Server stopped`);
    process.exit(err ? 1 : 0);
  });
});
