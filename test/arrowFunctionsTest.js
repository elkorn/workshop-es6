'use strict';

import should from 'should';

describe('Arrow functions', () => {

  // A useful guideline for cases where using arrow functions is appropriate, see
  // https://raw.githubusercontent.com/getify/You-Dont-Know-JS/master/es6%20%26%20beyond/fig1.png

  it('use expresion syntax for simple logic', () => {
    [1, 2, 3, 4, 5, 6].filter(el => el % 2 === 0).should.be.eql([2, 4, 6]);
    [1, 2, 3, 4, 5, 6].reduce((a, b) => a + b, 0).should.be.equal(21);
  });

  it('use normal syntax for complex logic', () => {
    [1, 2, 3, 4, 5, 6].map((el) => {
      if (el % 2 === 0) {
        return 'foo';
      } else {
        return 'bar';
      }
    }).should.be.eql(['bar', 'foo', 'bar', 'foo', 'bar', 'foo', ]);
  });

  it('provide lexical scope', () => {
    function WithoutLexicalScope() {
      this.value = 2;

      return function() {
        return this.value;
      };
    }

    function WithLexicalScope() {
      this.value = 2;

      return () => this.value;
    }

    let scope = new WithLexicalScope();
    let noScope = new WithoutLexicalScope();

    scope().should.eql(2);
    noScope.should.throw();
  });

  it('be helpful for exploring λ-calculus', () => {
    // Just to show the idea, this is of course totally superfluous. :)
    let λ = expression => boundVar => expression(boundVar);
    let id = λ(x => x);
    let id2 = x => x;
    let multiply  = λ(x => λ(y => x*y));
    let multiply2 = x => y => x*y;

    id(12).should.be.equal(12);
    id2(12).should.be.equal(12);

    multiply(12)(3).should.be.equal(36);
    multiply2(12)(3).should.be.equal(36);


    // Church's notation
    // fix = λf.(λx.f(λv.x(x)(v)))(λx.f(λv.x(x)(v)))
    let fix = f => (x => f(v => x(x)(v)))
                   (x => f(v => x(x)(v)));
  });
});
