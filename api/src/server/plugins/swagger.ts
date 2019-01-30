'use strict';

const inert = require('inert');
const vision = require('vision');
const hapiSwagger = require('hapi-swagger');
const pack = require(`${process.cwd()}/package`);

const swaggerOptions = {
  info: {
    title: 'Test API Documentation',
    version: pack.version,
  },
};

const swaggerPlugin =
    [inert, vision, {plugin: hapiSwagger, options: swaggerOptions}];
export {swaggerPlugin};