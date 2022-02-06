import {
  REQUEST,
  SUCCESS,
  FAILURE
} from "../consts";

export default (store) => (next) => async (action) => {
  if (!action.CallApi) return next(action);

  const {CallApi, type, ...rest} = action;

  next({...rest, type: type + REQUEST});

  try {
    const res = await fetch(CallApi);
    const data = await res.json();

    if (!res.ok) throw data;

    next({...rest, type: type + SUCCESS, data});
  }
  catch (error) {
    next({...rest, type: type + FAILURE, error});
  }
}
