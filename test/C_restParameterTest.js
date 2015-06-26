'use strict';

describe('Rest parameter', () => {
  it('gathers arguments for variadic functions in an array', () => {

    function variadic(...args) {
      Array.isArray(args).should.be.equal(true);
      return args;
    }

    variadic(1, 2, 3, 4, 5).should.be.eql([1, 2, 3, 4, 5]);
  });

  it('can be used in destructuring', () => {
    let map = new Map().set(1, 'one').set(2, 'two');
    [...map.keys()].should.be.eql([1, 2]);
    [...map.values()].should.be.eql(['one', 'two']);
    [...map].should.be.eql([
      [1, 'one'],
      [2, 'two']
    ]);
  });
});
