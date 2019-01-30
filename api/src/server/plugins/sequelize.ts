'use strict';

const hapiSequelize = require('hapi-sequelizejs');
const sequelizeDb = require('sequelize');

const sequelizeInstance = new sequelizeDb(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWD,
    {host: process.env.DB_HOST, dialect: 'mysql'});

const options = {
  name: process.env.DB_NAME,  // identifier
  models: [`../models/*.ts`],
  sequelize: sequelizeInstance,
  sync: true,
  forceSync: true,
};

const sequelizePlugin = [{plugin: hapiSequelize, options}];

export {sequelizePlugin};