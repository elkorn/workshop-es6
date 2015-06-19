'use strict';

import should from 'should';

describe('Symbols', () => {
  it('are unique', () => {
    new Array(1000).forEach(() => {
      Symbol().should.not.equal(Symbol());
    });
  });

  it('created with labels are still unique', () => {
    (Symbol('foo') === Symbol('foo')).should.be.equal(false);
  });

  it('Symbol.for(str)s are identical for given values', () => {
    (Symbol.for('foo') === Symbol.for('baz')).should.be.equal(false);
    (Symbol.for('foo') === Symbol.for('foo')).should.be.equal(true);
  });

  it('allow having safe privacy with prototypes without function closures', () => {
    let Clazz = (function() {
      let privateStuff = {};

      function initPrivateScope() {
        let symbol = Symbol();
        privateStuff[symbol] = {};
        return symbol;
      }

      function setPrivate(instance, key, value) {
        privateStuff[instance._sym][key] = value;
      }

      function getPrivate(instance, key) {
        return privateStuff[instance._sym][key];
      }

      function PrivateValueExample(privateValue) {
        this._sym = initPrivateScope();
        setPrivate(this, 'foo', privateValue);
      }

      PrivateValueExample.prototype.publicMethod = function() {
        return getPrivate(this, 'foo');
      };

      return PrivateValueExample;
    })();

    let instance1 = new Clazz(12345);
    let instance2 = new Clazz(999);

    should.not.exist(instance1.foo);
    should.not.exist(instance2.foo);
    instance1.publicMethod().should.eql(12345);
    instance2.publicMethod().should.eql(999);
  });
});
