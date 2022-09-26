import {HOME_ROUTE} from "./consts";

export default (e) => {
  e.preventDefault();
  localStorage.removeItem('token');
  localStorage.removeItem('messages');
  window.location.href = HOME_ROUTE;
}
