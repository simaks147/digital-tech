const filtersToString = (obj = {}) => {
  const string = Object.entries(obj).reduce((acc, [key, values]) => {
    if (!values || values.length === 0) return acc;

    if (values.constructor === Object) values = Object.values(values);
    if (values.constructor === Number || values.constructor === String) values = [values];

    acc += `${key}:${values.join('|')},`;
    return acc;
  }, '');

  return string.slice(0, -1);
};

export default filtersToString;
