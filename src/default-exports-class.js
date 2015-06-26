'use strict';

export default class {
  constructor(a) {
    this._a = a;
  }

  foo() {
    return 'foo ' + this._a;
  }
};
