import 'mocha';

import {expect} from 'chai';

import {Server} from '..';

import {db} from '../../helpers/db';

(async () => {
  await db.sync();
})();

(async () => {
  await Server.init();
})();

describe('Verify Todo API', () => {
  it('should return 200 for calling all todos', async () => {
    const injectOptions = {method: 'GET', url: '/api/todos'};

    const response = await Server.inject(injectOptions);

    expect((response.statusCode)).to.equal(200);
  });

  it('should return fail when creating a bad todo', async () => {
    const injectOptions = {
      method: 'POST',
      payload: {foo: 'bar'},
      url: '/api/todo'
    };

    const response = await Server.inject(injectOptions);

    expect((response.statusCode)).not.equal(200);
  });

  it('should accept a good todo', async () => {
    const injectOptions = {
      method: 'POST',
      payload: {name: 'bar', completed: true, description: 'hello'},
      url: '/api/todo'
    };

    const response = await Server.inject(injectOptions);
    expect((response.statusCode)).to.equal(200);
  });

});