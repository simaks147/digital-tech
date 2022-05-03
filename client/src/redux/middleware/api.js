import {
  REQUEST,
  SUCCESS,
  FAILURE
} from "../consts";

const createPostParams = (data) => ({
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(data)
});

export default (store) => (next) => async (action) => {
  if (!action.CallApi) return next(action);

  const {CallApi, values, type, ...rest} = action;

  next({...rest, type: type + REQUEST});

  try {
    const params = values ? createPostParams(values) : {};

    const res = await fetch(CallApi, params);
    const data = await res.json();

    if (!res.ok) throw data;

    next({...rest, type: type + SUCCESS, data});
  }
  catch (error) {
    next({...rest, type: type + FAILURE, error});
  }
}
