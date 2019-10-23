import {combineReducers} from "redux";
import gameReducer from "./Game";
import registerReducer from "./register";
import alertReducer from "./alert";

const allReducers = combineReducers({
  gameReducer,
  registerReducer,
  alertReducer,
});
export default allReducers;
