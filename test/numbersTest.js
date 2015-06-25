'use strict';

import should from 'should';

describe('Numbers', () => {
  it('can be checked for finiteness', () => {
    Number.isFinite(123).should.be.true;

    Number.isFinite(Infinity).should.be.false;
    Number.isFinite(-Infinity).should.be.false;
    Number.isFinite(NaN).should.be.false;

    Number.isFinite('123').should.be.false;
    isFinite('123').should.be.true;
  });

  it('provides a value to help float comparison', () => {
    let numEqual = (a, b) => Math.abs(a - b) < Number.EPSILON;

    ((0.1 + 0.2) === 0.3).should.be.false; // more info on why is that: https://www.youtube.com/watch?v=MqHDDtVYJRI
    (numEqual(0.1 + 0.2, 0.3)).should.be.true;
  });

  it('provide values determining the range of "safe" integers', () => {
    // The notion of "safe integers" means integers that are correctly represented in JavaScript.
    // Outside of that range, the representations may be wrong and thus you cannot rely on them - you'll have to use a library like https://www.npmjs.com/package/big-integer.
    Number.isSafeInteger(Math.pow(2, 10)).should.be.true;

    Number.isSafeInteger(Math.pow(2, 53)).should.be.true;
    Number.isSafeInteger(Math.pow(2, 54)).should.be.false;

    Number.isSafeInteger(Math.pow(2, -53)).should.be.false;
    Number.isSafeInteger(-Math.pow(2, 53) + 1).should.be.true;

    Number.MIN_SAFE_INTEGER.should.be.equal(-Math.pow(2, 53) + 1);
    Number.MAX_SAFE_INTEGER.should.be.equal(Math.pow(2, 53) - 1);
  });
});
