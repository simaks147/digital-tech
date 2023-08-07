import { TokenType } from "./types/common";

interface IArrayToMap {
  [key: string]: any,
  slug?: string,
  id?: string,
}

interface IReqParam {
  method?: string,
  headers?: Headers,
  body?: string
}

export const arrToMap = (arr: IArrayToMap[]): Record<string, any> =>
  arr.reduce((acc, item) => {
    const id = item.slug || item.id;

    if (id) return { ...acc, [id]: item };

    return acc;
  }, {});

export const objToArr = (obj: object): any[] => Object.values(obj)

export const createReqParams = (
  values: object | undefined,
  token: TokenType | undefined,
  method: string | undefined
): IReqParam => {
  let params: IReqParam = {};
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
