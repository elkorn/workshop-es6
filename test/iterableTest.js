'use strict';

describe('iterables, iterators', () => {
  it('iterators reside under a specific symbol', () => {
    let arr = [1, 2, 3];
    let arrIter = arr[Symbol.iterator]();

    arrIter.next().should.have.property('value', 1);
    arrIter.next().should.have.property('value', 2);
    arrIter.next().should.have.property('value', 3);
    arrIter.next().should.have.property('done', true);

    let map = new Map([
      [1, 'one'],
      [2, 'two']
    ]);
    let mapIter = map[Symbol.iterator]();
    mapIter.next().should.have.property('value', [1, 'one']);
    mapIter.next().should.have.property('value', [2, 'two']);
    mapIter.next().should.have.property('done', true);
  });
  
  it('iterables allow creating useful combinators', () => {
    function zip(...iterables) {
      const iterators = iterables.map(iterable => iterable[Symbol.iterator]());
      let done = false;
      return {
        // Computed property
        [Symbol.iterator]() {
          return this;
        },
        next() {
          if (done) {
            return {
              done: true
            };
          }

          let items = iterators.map(i => i.next());
          done = items.some(i => i.done);
          if (done) {
            for (let iterator of iterators) {
              // inform that we will not be calling `next` on the iterator.
              iterator.return();
            }
          } else {
            return {
              value: items.map(i => i.value)
            };
          }
        }
      };
    }

    let zipped = zip([1, 2, 3], ['a', 'b', 'c']);

    zipped.next().should.have.property('value', [1, 'a']);
    zipped.next().should.have.property('value', [2, 'b']);
    zipped.next().should.have.property('value', [3, 'c']);
  });

  describe('for-of loop', () => {
    it('acts like a better version of for-in', () => {
      let input = [1, 2, 3, 4, 5];
      let x = 1;
      for (let n of input) {
        n.should.be.equal(x++);
      }
    });
  });
});
