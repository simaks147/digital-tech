export const arrToMap = (arr) =>
  arr.reduce((acc, item) => ({ ...acc, [item.slug || item.id]: item }), {});

export const objToArr = (obj) =>
  [].concat(obj).reduce((acc, item) => [...acc, ...Object.values(item)], []);

export const createReqParams = (values, token) => {
  let params = {};
  let headers = new Headers();

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  if (values) {
    headers.set('Content-Type', 'application/json');
    params.method = 'POST';
    params.body = JSON.stringify(values);
  }

  params.headers = headers;

  return params;
};
