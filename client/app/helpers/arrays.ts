export const makeArray = (size: number, placeholder = 0): any[] =>
  [...new Array(size)].map(() => placeholder);

export const shuffle = array =>
  // eslint-disable-next-line fp/no-mutating-methods
  array
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1]);
