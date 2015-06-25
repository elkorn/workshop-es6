'use strict';

describe('Strings', () => {
  it('allow interpolating variables in them', () => {
    let val1 = 12;
    let val2 = 333;
    let str = `Hey, this is ${val1} and that is ${val2}.`;

    str.should.be.eql('Hey, this is ' + val1 + ' and that is ' + val2 + '.');
  });

  it('support any JS expressions', () => {
    `hey hey ${((a,b)=> a * b)(12,13)}`.should.be.eql('hey hey ' + ((a, b) => a * b)(12, 13).toString());
  });

  // Unicode code points are 21 bit long, code points beyond the first 16 bits of the code point range had to be represented by two characters in ES5.
  it('support new unicode escapes: \uD83D\uDE80 -> \u{1F680}', () => {});

  it('support multiline', () => {
    let str = `multiline
strings
are
now
supported`;

    str.should.be.equal('multiline\nstrings\nare\nnow\nsupported');
  });

  it('support new methods', () => {
    'cat'.startsWith('ca').should.be.true;
    'cat'.startsWith('at').should.be.true;
    'catatonia'.includes('aton').should.be.true;
    'NaN'.repeat(3).should.be.equal('NaNNaNNaN');
  });
});
