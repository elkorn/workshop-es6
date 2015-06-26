'use strict';

import I18n from '../src/i18n';

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

  it('can be tagged with functions', () => {
    let messageBundle_de = {
      'Hello {0}, you have {1} in your bank account.': 'Hallo {0}, Sie haben {1} auf Ihrem Bankkonto.'
    };

    let name = 'Bob';
    let amount = 1234.56;
    let i18n;

    i18n = I18n.use({
      locale: 'de-DE',
      defaultCurrency: 'EUR',
      messageBundle: messageBundle_de
    });

    let expectedAmount = '€1,234.56';

    (i18n `Hello ${name}, you have ${amount}:c in your bank account.`).should.be.equal(`Hallo ${name}, Sie haben ${expectedAmount} auf Ihrem Bankkonto.`);
  });
});
