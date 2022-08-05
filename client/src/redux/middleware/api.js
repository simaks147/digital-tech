import {
  REQUEST,
  SUCCESS,
  FAILURE
} from "../consts";
import {createReqParams} from "../utils";

export default (store) => (next) => async (action) => {
  if (!action.CallApi) return next(action);

  const {CallApi, method, values, token, type, ...rest} = action;

  next({...rest, type: type + REQUEST});

  try {
    const params = createReqParams(values, token, method);
    const res = await fetch(CallApi, params);

    if (res.status === 404) {
      throw {error: {message: `Invalid request for address ${res.url}`}};
    }

    if (res.status === 401) {
      localStorage.removeItem('token');
      window.location.reload();
    }

    const data = await res.json();

    if (!res.ok) throw data;

    next({...rest, type: type + SUCCESS, data});
  }
  catch (error) {
    throw next({...rest, type: type + FAILURE, error});
  }
}
