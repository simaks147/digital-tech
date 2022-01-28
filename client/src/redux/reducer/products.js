import {products} from "../../fixtures";
import {arrToMap} from "../utils";

export default (state = arrToMap(products), action) => {
  return state;
}
