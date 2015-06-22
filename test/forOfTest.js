'use strict';

describe('for-of loop', () => {
  it('acts like a better version of for-in', () => {
    let input = [1, 2, 3, 4, 5];
    let x = 1;
    for (let n of input) {
      n.should.be.equal(x++);
    }
  });
});
