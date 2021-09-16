export const pipe = <R>(...fns: Array<(a: R) => R>) =>
  fns.reduce((prevFn, nextFn) => (value) => nextFn(prevFn(value)));
