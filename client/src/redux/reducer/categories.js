import {categories} from "../../fixtures";
import {arrToMap} from "../utils";

export default (state = arrToMap(categories), action) => {
  return state;
}
