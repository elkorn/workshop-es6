'use strict';

import should from 'should';

describe('Collections', () => {
  describe('Weak collections', () => {
    it('fix a memory leak problem with dead keys', () => {
      let m = new Map();
      let s = new Set();
      let wm = new WeakMap();

      (() => {
        let key = {};
        m.set(key, 12);
        s.add(key);
        wm.set(key, 12);
      })();

      // Available thanks to `--expose-gc` set on mocha CLI task.
      global.gc();

      // `key` cannot be GCed due to them being in the map - we've got a memory leak.
      m.should.have.property('size', 1);
      s.should.have.property('size', 1);

      /*
       WeakMap fixes this, but it cannot be really shown here due to the fact that it supports only .has(), .get(), .set() and .delete() operations.
       These restrictions are one of the requirements for the garbage collection improvement offered by WeakMaps and WeakSets to be possible.
       */
    });
  });

  describe('WeakMap', () => {
    it('provides another way of achieving privacy', () => {
      let module = (function() {
        let _counters = new WeakMap();
        let _actions = new WeakMap();

        class Countdown {
          constructor(counter, action) {
            _counters.set(this, counter);
            _actions.set(this, action);
          }

          decrement() {
            let counter = _counters.get(this);
            if (counter < 1) {
              return;
            }

            counter--;
            _counters.set(this, counter);
            if (counter === 0) {
              _actions.get(this)();
            }
          }
        }

        return {
          Countdown: Countdown
        };
      })();

      let x = 0;
      let cd = new module.Countdown(3, () => x = 42);

      cd.decrement();
      cd.decrement();
      cd.decrement();
      x.should.be.equal(42);
    });
  });
});
