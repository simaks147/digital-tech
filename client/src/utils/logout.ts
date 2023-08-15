import { MouseEvent } from "react";
import { HOME_ROUTE } from "./consts";

export default (e: MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  localStorage.removeItem('token');
  localStorage.removeItem('messages');
  window.location.href = HOME_ROUTE;
}
