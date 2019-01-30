import 'mocha';

import {expect} from 'chai';

import {Norm} from './norm';

describe('Hello function', () => {
  it('should return hello world', () => {
    const result = new Norm('hello');
    expect(result.hello()).to.equal('Hello world!');
  });
});