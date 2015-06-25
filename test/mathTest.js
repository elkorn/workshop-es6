'use strict';

import should from 'should';

describe('Math', () => {
  let numEqual = (a, b) => Math.abs(a - b) < Number.EPSILON;

  describe('supports new methods', () => {
    it('sign: signum function', () => {
      Math.sign(-10).should.be.equal(-1);
      Math.sign(10).should.be.equal(1);
      Math.sign(0).should.be.equal(0);
      isNaN(Math.sign(NaN)).should.be.true;
    });

    it('trunc: removes the decimal fraction of a number', () => {
      Math.trunc(3.1).should.be.equal(3);
      Math.trunc(3.9991).should.be.equal(3);
      Math.trunc(-3.1).should.be.equal(-3);
      Math.trunc(-3.9991).should.be.equal(-3);
    });

    it('cbrt: cuberoot', () => {
      Math.cbrt(8).should.be.equal(2);
    });

    it('expm1: e^x - 1', () => {
      Math.expm1(10).should.be.equal(Math.exp(10) - 1);
    });

    it('log1p: log(1+x)', () => {
      Math.log1p(10).should.be.equal(Math.log(11));
    });

    it('different base logarithms', () => {

      numEqual(Math.log2(8), 3).should.be.true;
      Math.log10(100).should.be.equal(2);
    });

    it('trigonometric functions', () => {
      Math.sinh(10).should.be.equal((Math.exp(10) - Math.exp(-10)) / 2);
      Math.cosh(10).should.be.equal((Math.exp(10) + Math.exp(-10)) / 2);
      Math.tanh(10).should.be.equal(Math.sinh(10) / Math.cosh(10));
      Math.sinh(Math.asinh(10)).should.be.equal(10);
      numEqual(Math.cosh(Math.acosh(10))).should.be.true;
    });

    it('hypot: hypotenuse (sqrt(a^2 + b^2 + ...))', () => {
      Math.hypot(1, 2, 3, 4, 5).should.be.equal(Math.sqrt(Math.pow(1, 2) + Math.pow(2, 2) + Math.pow(3, 2) + Math.pow(4, 2) + Math.pow(5, 2)));
    });
  });
});
