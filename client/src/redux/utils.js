export const arrToMap = (arr) =>
  arr.reduce((acc, item) => ({ ...acc, [item.slug || item.id]: item }), {});
