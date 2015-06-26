'use strict';

import should from 'should';
import {
  square, diag
}
from '../src/named-exports';

import * as namedExports from '../src/named-exports';

import importedFunction from '../src/default-exports-function';
import ImportedClass from '../src/default-exports-class';

describe('Modules', () => {
  it('allow named exports', () => {
    square(12).should.be.equal(144);
    diag(3, 4).should.be.equal(5);
  });

  it('allow importing the whole module', () => {
    namedExports.PI.should.be.equal(Math.PI);
    namedExports.ANOTHER_PI.should.be.equal(namedExports.PI);
    namedExports.YET_ANOTHER_PI.should.be.equal(namedExports.ANOTHER_PI);
    namedExports.square.should.be.equal(square);
    namedExports.diag.should.be.equal(diag);
  });

  it('allow default exports', () => {
    importedFunction(1, 2).should.be.equal(2);
    let x = new ImportedClass(8);
    x.foo().should.be.equal('foo ' + 8);
    // Watch out for this!
    ImportedClass.name.should.be.equal('_default');
  });
});
