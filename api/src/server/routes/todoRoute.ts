'use strict';

const boom = require('boom');
const joi = require('joi');

import { logger } from '../../helpers/logger';
import { Todo } from '../../models/Todo';

const todoRoute = {
  name: 'TodoApi',

  register: async (server, options) => {
    server.route([
      {
        options: {
          description: 'Get all Todos',
          notes: 'Returns a list of all Todos',
          tags: ['api'],

        },
        method: 'GET',
        path: '/api/todos',
        handler: async (request, h) => {
          return await Todo.findAll();
        }
      },

      {
        options: {
          description: 'Create a new Todo Item',
          notes: 'Create a new Todo Item',
          tags: ['api'],
          validate: {
            payload: Todo.joiValidate, 
            options: {
              allowUnknown: true
            }
          }
        },
        method: 'POST',
        path: '/api/todo',

        handler: async (request, h) => {
          const todo = new Todo(request.payload);
          try {
            const todo = await Todo.create(request.payload);
            return todo;
          } catch (e) {
            logger.error(e);
            return boom.badRequest();
          }
        }
      },

      {
        options: {
          description: 'Get a Todo Item',
          notes: 'Returns a Todo Item by the supplied Id from URL parameter',
          tags: ['api'],
        },
        method: 'GET',
        path: '/api/todo/{id}',

        handler: async (request, h) => {
          const todo = await Todo.findByPk(request.params.id);
          if (!todo) {
            return boom.notFound();
          }
          return todo;
        }
      },

      {
        options: {
          description: 'Update a Todo Item',
          notes:
            'Update an existing Todo by Id. Response will be total rows updated. If no chage from prior values then # will be zero',
          tags: ['api'],
          validate: {
            payload: Todo.joiValidate,
            options: {
              allowUnknown: true
            },
            failAction: (request, h, err) => {
              throw err;
            }
          }

        },
        method: 'PUT',
        path: '/api/todo/{id}',

        handler: async (request, h) => {
          return await Todo.update(
            request.payload, { where: { id: request.params.id } });
        }
      },

      {
        options: {
          description: 'Delete a Todo Item',
          notes: 'Delete a Todo Item',
          tags: ['api']

        },
        method: 'DELETE',
        path: '/api/todo/{id}',

        handler: async (request, h) => {
          return await Todo.destroy({ where: { id: request.params.id } });
        }
      },

    ]);
  }
};


export { todoRoute };