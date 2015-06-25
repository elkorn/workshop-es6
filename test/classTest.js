'use strict';

describe('new OOP features', () => {
  describe('classes', () => {
    it('use all the sugar shorthands to cover up ES5\'s prorotypes', () => {
      class Dog {
        constructor(name) {
          this._name = name;
        }

        bark() {
          return `${this._name}: Woof!`;
        }
      }

      let rex = new Dog('Rex');

      rex.bark().should.equal('Rex: Woof!');
    });

    it('make inheritance less of a pain than it was before', () => {
      class Dog {
        constructor(name) {
          this._name = name;
        }

        bark() {
          return `${this._name}: Woof!`;
        }
      }

      class AttackDog extends Dog {
        // constructor(name) {
        //   super(name);
        // }

        bark() {
          return super.bark() + ` *bite*`;
        }
      }

      let rex = new AttackDog('Rex');

      rex.bark().should.equal('Rex: Woof! *bite*');
    });

    it('support static properties', () => {

      class Comment {
        constructor(content) {
          this._content = content;
        }

        isPositive() {
          return this._content.includes('love');
        }

        isNegative() {
          return this._content.includes('hate');
        }

        static verify(comment) {
          if (comment.isPositive()) {
            if (comment.isNegative()) {
              return Comment.AMBIVALENT;
            }

            return Comment.POSITIVE;
          }

          if (comment.isNegative()) {
            return Comment.NEGATIVE;
          }

          return Comment.NEUTRAL;
        }

        static get POSITIVE() {
          return Symbol();
        }

        static get NEGATIVE() {
          return Symbol();
        }

        static get AMBIVALENT() {
          return Symbol();
        }

        static get UNKNOWN() {
          return Symbol();
        }
      }

      // Static data properties can also be defined as follows. The drawback here is that they can be assigned to.
      // Comment.POSITIVE = Symbol();
      // Comment.NEGATIVE = Symbol();
      // Comment.AMBIVALENT = Symbol();
      // Comment.NEUTRAL = Symbol();

      let comment = new Comment('I love haters');

      (Comment.verify(comment) === Comment.AMBIVALENT).should.be.true;
    });
  });
});
