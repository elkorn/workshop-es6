'use strict';

describe('Destructuring', () => {
  it('takes elements out of arrays', () => {
    let [a,b,c] = [1,2,3];

    a.should.be.equal(1);
    b.should.be.equal(2);
    c.should.be.equal(3);
  });

  it('allows skipping intermediate values', () => {
    let [,,value] = ['foo', 'bar', 42, 13];

    value.should.be.equal(42);
  });

  it('allows capturing tails with a rest argument', () => {
    let [head, ...tail] = [1,2,3,4];

    head.should.be.equal(1);
    tail.should.be.eql([2,3,4]);
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
    it('more elegant parameter object', () =>{
      function usesParameters({par1, par2, par3}) {
        arguments[0].should.have.property('par1', par1);
        arguments[0].should.have.property('par2', par2);
        arguments[0].should.have.property('par3', par3);

        return par1 + par2 + par3;
      }

      let result = usesParameters({par1: 1, par2: 2, par3: 3});

      result.should.be.equal(6);
    });

    it('defaults in parameter object', () => {
        function usesParameters({par1 = 0, par2 = 0, par3 = 0}, par) {
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
  });

  // it('allows pattern matching', () => {
  //   // This is quite far from sensible pattern matching and it does not use destructuring...
  //   let x = {
  //     a: 1,
  //     b: 2
  //   };

  //   function match(val) {
  //     return function(...cases) {
  //       var res;
  //       var found = false;
  //       cases.some(c => {
  //         let caseResult = c(val);
  //         if (caseResult.matched) {
  //           res = caseResult.result;
  //           found = true;
  //         }
  //         return caseResult.matched;
  //       });
  //       if (!found) {
  //         throw new Error('MatchError');
  //       }

  //       return res;
  //     };
  //   }

  //   function _case(pattern, handler) {
  //     return function(val) {
  //       // not subtle enough
  //       if (JSON.stringify(pattern) === JSON.stringify(val)) {
  //         return {
  //           matched: true,
  //           result: handler(pattern)
  //         };
  //       }

  //       return {
  //         matched: false
  //       };
  //     };
  //   }

  //   let matchResult = match(x)(
  //     _case('str', (r) => {
  //       throw new Error('Should not reach here!');
  //     }),
  //     _case({
  //       a: 1,
  //       b: 2
  //     }, (r) => {
  //       r.a.should.be.equal(x.a);
  //       r.b.should.be.equal(x.b);
  //       return r.a + r.b;
  //     }));

  //   matchResult.should.be.equal(3);
  // });
});
