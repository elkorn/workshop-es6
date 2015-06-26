'use strict';

import should from 'should';

describe('Collections', () => {

  /*
   Problems with objects as keyed collections in ES5:
   - name collisions with contained values and instance methods (had to circumvent it with Object.create(null), using hasOwnProperty etc.)
   - property keys have to be strings
   - the only sensible way to ask how many properties an object has is Object.keys(obj).length which requires iterating over them.
   */
  describe('Set', () => {
    var s;
    beforeEach(() => {
      s = new Set();
    });

    it('holds elements', () => {
      s.add('a');
      s.add('b');
      s.has('a').should.be.true;
      s.has('b').should.be.true;
      s.has('c').should.be.false;
      s.should.have.property('size', 2);
      s.delete('b');
      s.should.have.property('size', 1);
      s.has('b').should.be.false;
    });

    it('can be iterated through', () => {
      for (let val of s) {
        (val === 'a' || val === 'b').should.be.true;
      }

      s.forEach(val => (val === 'a' || val === 'b').should.be.true);
    });

    it('does not support indexing', () => {
      should.not.exist(s[0]);
      should.not.exist(s.a);
    });

    it('can be created from an iterable', () => {
      let s2 = new Set([1, 2, 3, 4, 5]);
      s2.should.have.property('size', 5);

      // We can easily eliminate duplicates from an array using a Set.
      let s3 = new Set([6, 6, 6, 6, 6]);
      s3.should.have.property('size', 1);

      // The way to do it in ES5 was a bit hacky:
      var res = [6, 6, 6, 6].filter(function(val, index, src) {
        return src.indexOf(val) === index;
      });

      res.should.have.property('length', 1);
    });

    it('can be cleared', () => {
      s.add('a');
      s.add('b');
      s.clear();
      s.should.have.property('size', 0);
    });

    describe('is missing some useful methods', () => {

      it('map', () => {
        let setMap = (set, f) => {
          let result = new Set();
          for (let val of set) {
            result.add(f(val));
          }

          return result;
        };

        let index = 0;
        for (let val in setMap(new Set('012345'), str => parseInt(str, 10))) {
          val.should.be.equal(index++);
        }
      });

      it('filter', () => {
        let setFilter = (set, predicate) => {
          let result = new Set();

          for (let val of set) {
            if (predicate(val)) {
              result.add(val);
            }
          }

          return result;
        };

        let s = new Set([1, 2, 3, 4, 5]);
        setFilter(s, (x) => x % 2 === 0).should.have.property('size', 2);
      });

      it('some', () => {
        let setSome = (set, predicate) => {
          for (let val of set) {
            if (predicate(val)) return true;
          }

          return false;
        };

        setSome(new Set([1, 2, 3, 4]), (x) => x > 1).should.be.true;
        setSome(new Set([1, 2, 3, 4]), (x) => x > 4).should.be.false;
      });

      it('every', () => {
        let setEvery = (set, predicate) => {
          for (let val of set) {
            if (!predicate(val)) return false;
          }

          return true;
        };

        setEvery(new Set([1, 2, 3, 4]), (x) => x >= 1).should.be.true;
        setEvery(new Set([1, 2, 3, 4]), (x) => x > 1).should.be.false;
      });

      it('union', () => {
        let union = (...sets) => {
          return new Set(sets.reduce((result, set) => {
            return result.concat(...set);
          }, []));
        };

        let unified = union(new Set('abcd'), new Set('aefg'));
        unified.should.have.property('size', 7);
        unified.has('a').should.be.true;
        unified.has('b').should.be.true;
        unified.has('c').should.be.true;
        unified.has('d').should.be.true;
        unified.has('e').should.be.true;
        unified.has('f').should.be.true;
        unified.has('f').should.be.true;
      });

      it('intersection', () => {
        let intersection = (...sets) => {
          return new Set(sets.reduce((result, set1) => {
            return result.concat([...set1].filter(element => sets.every(set2 => set2.has(element))));
          }, []));
        };

        let inter = intersection(new Set('abcd'), new Set('adef'), new Set('adkl'));

        inter.has('a').should.be.true;
        inter.has('d').should.be.true;

        inter.has('b').should.be.false;
        inter.has('c').should.be.false;
        inter.has('e').should.be.false;
        inter.has('f').should.be.false;
        inter.has('k').should.be.false;
        inter.has('l').should.be.false;
      });
    });
  });
});
