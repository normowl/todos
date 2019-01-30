'use strict';

import * as winston from 'winston';

console.log(process.env.LOG_CONSOLE_OUT);

const logger: winston.Logger = winston.createLogger({
  format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
      ),
  level: 'info',
  transports: [
    new winston.transports.File({filename: 'error.log', level: 'error'}),
    new winston.transports.File({filename: 'all.log'}),
  ],
});

if (process.env.LOG_CONSOLE_OUT) {
  logger.add(new winston.transports.Console({format: winston.format.simple()}));
}

export {logger};