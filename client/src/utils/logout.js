import {HOME_ROUTE} from "./consts";

export default (e) => {
  e.preventDefault();
  localStorage.removeItem('token');
  window.location.href = HOME_ROUTE;
}
