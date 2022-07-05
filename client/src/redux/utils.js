export const arrToMap = (arr) =>
  arr.reduce((acc, item) => ({ ...acc, [item.slug || item.id]: item }), {});

export const objToArr = (obj) =>
  [].concat(obj).reduce((acc, item) => [...acc, ...Object.values(item)], []);

export const createReqParams = (values, token, method) => {
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

  switch (method) {
    case 'DELETE':
      params.method = 'DELETE';
      break;

    case 'PUT':
      params.method = 'PUT';
      break;
  }

  params.headers = headers;

  return params;
};
