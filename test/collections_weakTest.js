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
});
