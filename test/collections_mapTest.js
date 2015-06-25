'use strict';

import should from 'should';

describe('Collections', () => {
  describe('Map', () => {
    var m;

    beforeEach(() => m = new Map());

    it('contains key-value pairs', () => {
      m.set('key', 1234);
      m.set({
        test: 12
      }, 666);
      m.get('key').should.be.equal(1234);


      // CAVEAT: JavaScript does not do hashCode.
      should.not.exist(m.get({
        test: 12
      }));

      // but it works reference-wise
      let x = {
        test: 12
      };

      m.set(x, 777);
      m.get(x).should.be.equal(777);
    });

    it('can be iterated through', () => {
      m.set(1, 'a');
      m.set(2, 'b');
      m.set(3, 'c');
      let res = [];

      // Pretty cool if we use destructuring for kv pairs.
      for (let [key, value] of m) {
        res.push([key, value]);
      }

      res.should.be.eql([
        [1, 'a'],
        [2, 'b'],
        [3, 'c']
      ]);
    });

    it('has useful iterators', () => {
      m.set(1, 'a');
      m.set(2, 'b');
      m.set(3, 'c');

      let aggregate = (iterator) => {
        let result = [];
        for (let v of iterator) {
          result.push(v);
        }

        return result;
      };

      aggregate(m.keys()).should.eql([1, 2, 3]);
      aggregate(m.values()).should.eql(['a', 'b', 'c']);
      aggregate(m.entries()).should.eql([
        [1, 'a'],
        [2, 'b'],
        [3, 'c']
      ]);
    });
  });
});
