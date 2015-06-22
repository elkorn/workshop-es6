'use strict';

describe('Rest parameter', () => {
  it('gathers arguments for variadic functions in an array', () => {

    function variadic(...args) {
      Array.isArray(args).should.be.equal(true);
      return args;
    }

    variadic(1, 2, 3, 4, 5).should.be.eql([1, 2, 3, 4, 5]);
  });
});
