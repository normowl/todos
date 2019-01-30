'use strict';

import * as Hapi from 'hapi';

import { logger } from '../helpers/logger';
import { swaggerPlugin } from './plugins/swagger';

import { todoRoute } from './routes/todoRoute';
import { strip } from 'joi';

export class Server {
  private static _instance: Hapi.Server;

  static async init(): Promise<Hapi.Server> {
    try {
      Server._instance = new Hapi.Server({
        host: process.env.HOST,
        port: process.env.PORT, 
              
        routes: {
          cors: {origin: ['*'], credentials: true}}
      });

      await Server._instance.register(swaggerPlugin);
      await Server._instance.register(todoRoute);

      return Server._instance;
    } catch (error) {
      logger.info(`Server - There was something wrong: ${error}`);

      throw error;
    }
  }

  static async start(): Promise<Hapi.Server> {

    try {
      await Server._instance.start();

      logger.info('Server - Up and running!');
      logger.info(
          `Server endpoint: http://${process.env.HOST}:${process.env.PORT}`);

      return Server._instance;

    } catch (error) {

      logger.info(`Server - There was something wrong: ${error}`);

      throw error;
    }
  }


  static stop(): Promise<Error|void> {
    logger.info(`Server - Stopping!`);

    return Server._instance.stop();
  }

  static async recycle(): Promise<Hapi.Server> {
    await Server.stop();

    return await Server.start();
  }

  static instance(): Hapi.Server {
    return Server._instance;
  }

  static async inject(options: string|Hapi.ServerInjectOptions):
      Promise<Hapi.ServerInjectResponse> {
    return await Server._instance.inject(options);
  }
}