export const arrToMap = (arr) =>
  arr.reduce((acc, item) => ({ ...acc, [item.slug || item.id]: item }), {});

export const objToArr = (obj) =>
  [].concat(obj).reduce((acc, item) => [...acc, ...Object.values(item)], []);
