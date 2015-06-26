'use strict';

describe('Collections', () => {
  describe('Array', () => {
    it('can be created in new ways', () => {
      let arr = Array.from([1, 2, 3], v => v * v);
      arr.should.be.eql([1, 4, 9]);
      Array.of(1, 2, 3, 4).should.be.eql([1, 2, 3, 4]);
    });

    it('supports searching', () => {
      let arr = [1,2,3,4,5];
      arr.find(v => v > 3).should.be.equal(4);
      arr.findIndex(v => v > 3).should.be.equal(3);
    });
  });
});
