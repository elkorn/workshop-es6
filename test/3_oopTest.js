'use strict';
import should from 'should';

describe('new OOP features', () => {
  describe('in Object and object literals', () => {
    it('method definitions', () => {
      let obj = {
        foo(x) {
          return x * 2;
        }
      };

      obj.foo(12).should.equal(24);
    });

    it('computed property keys', () => {
      let repeat = (str, n) => str.repeat(n);

      let obj = {
        [repeat('test', 2)](x) {
          return 'foo' + x;
        }
      };

      obj.testtest(12).should.equal('foo' + 12);
    });

    it('generator method sugar', () => {
      let obj = {
          * greetingGen() {
            yield 'hello';
          }
      };

      obj.greetingGen().next().should.have.property('value', 'hello');
    });

    it('assign: native implementation of _.extend', () => {
      let obj = {
        foo: 123
      };
      Object.assign(obj, {
        bar: 'baz'
      });
      obj.should.have.property('bar', 'baz');
    });

    it('getters and setters: syntax sugar for ES5 functionality', () => {
      let obj = {
        get foo() {
          return `foo with bar: ${this._bar} and baz: ${this._baz}`;
        },
        get bar() {
          return this._bar;
        },
        set bar(value) {
          this._baz = (this._baz || 0)  + 1;
          this._bar = value;
        }
      };

      obj.foo.should.be.equal('foo with bar: undefined and baz: undefined');
      should.not.exist(obj.bar);
      obj.bar = 112;
      obj.bar.should.be.equal(112);
      obj.foo.should.be.equal('foo with bar: 112 and baz: 1');
    });
  });
});
