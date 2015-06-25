'use strict';

describe('Destructuring', () => {
  it('takes elements out of arrays', () => {
    let [a, b, c] = [1, 2, 3];

    a.should.be.equal(1);
    b.should.be.equal(2);
    c.should.be.equal(3);
  });

  it('allows skipping intermediate values', () => {
    let [, , value] = ['foo', 'bar', 42, 13];

    value.should.be.equal(42);
  });

  it('allows capturing tails with a rest argument', () => {
    let [head, ...tail] = [1, 2, 3, 4];

    head.should.be.equal(1);
    tail.should.be.eql([2, 3, 4]);
  });

  it('works with objects', () => {
    let object1 = {
      prop1: 12,
      prop2: 13
    };

    let {
      prop1: var1,
      prop2: var2
    } = object1;

    var1.should.be.equal(object1.prop1);
    var2.should.be.equal(object1.prop2);
  });

  it('can use default property names when used for assignment', () => {
    let x = 12;
    let y = 13;
    let obj = {
      x, y
    };

    obj.should.have.property('x', x);
    obj.should.have.property('y', y);
  });


  describe('can be nested', () => {
    it('in arrays', () => {
      let [a, [b, [c]],
           [
             [
               [d]
             ]
           ]
          ] = [1, [2, [3]],
               [
                 [
                   [4]
                 ]
               ]
              ];

      a.should.be.equal(1);
      b.should.be.equal(2);
      c.should.be.equal(3);
      d.should.be.equal(4);
    });

    it('in objects', () => {
      let obj = {
        a: 'foo',
        test: [123, {
          b: 13
        }]
      };
      let {
        a: a,
        test: [test0, {
          b: b
        }]
      } = obj;

      a.should.be.equal(obj.a);
      test0.should.be.equal(obj.test[0]);
      b.should.be.equal(obj.test[1].b);
    });
  });

  describe('Allows new use cases', () => {
    it('more elegant parameter object', () => {
      function usesParameters({
        par1, par2, par3
      }) {
        arguments[0].should.have.property('par1', par1);
        arguments[0].should.have.property('par2', par2);
        arguments[0].should.have.property('par3', par3);

        return par1 + par2 + par3;
      }

      let result = usesParameters({
        par1: 1,
        par2: 2,
        par3: 3
      });

      result.should.be.equal(6);
    });

    it('defaults in parameter object', () => {
      function usesParameters({
        par1 = 0, par2 = 0, par3 = 0
      }, par) {
        return {
          par1: par1,
          par2: par2,
          par3: par3,
          par: par
        };
      }

      let result = usesParameters({
        par3: 3
      }, 5);

      result.par1.should.be.equal(0);
      result.par2.should.be.equal(0);
      result.par3.should.be.equal(3);
      result.par.should.be.equal(5);
    });

    it('multiple return values', () => {
      function foo(a) {
        return {
          a: a * 2,
          done: true
        };
      }

      let {
        a, done
      } = foo(12);

      a.should.be.equal(24);
      done.should.be.true;
    });

    it('destructuring regexps', () => {
      let rx1 = /(\d{4})-(\d{2})-(\d{2})/;

      // Don't forget to null-check!
      let [, year, month, day] = rx1.exec('1999-12-11');

      year.should.be.equal('1999');
      month.should.be.equal('12');
      day.should.be.equal('11');
    });
  });

  it('has some pitfalls', () => {
    let x = {
      a: 12,
      b: 13
    };
    // Pitfall: you cannot mix declaring new variables and assigning to existing ones within a destructuring.
    // This won't work:
    // let quux;
    // let {a: quux, b: baz} = x;

    // You'd have to either do this:
    let quux;
    let baz;
    ({
      a: quux,
      b: baz
    } = x); // Pitfall:  cannot start an expression with `{`, it needs to be wrapped.

    // Or this:
    let {
      a, b
    } = x;

    quux.should.be.equal(x.a);
    baz.should.be.equal(x.b);
    a.should.be.equal(x.a);
    b.should.be.equal(x.b);
  });
});
