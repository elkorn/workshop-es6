'use strict';

export const PI = Math.PI;

export function square(x) {
  return x * x;
}

export const sqrt = Math.sqrt;

export function diag(x, y) {
  // We can normally use the exported elements within the module.
  return sqrt(square(x) + square(y));
}

export {
  PI as ANOTHER_PI, PI as YET_ANOTHER_PI
};
