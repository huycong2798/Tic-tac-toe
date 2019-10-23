import {combineReducers} from "redux";
import gameReducer from "./Game";
import registerReducer from "./register";
import alertReducer from "./alert";
import loginReducer from "./login";

const allReducers = combineReducers({
  gameReducer,
  registerReducer,
  alertReducer,
  loginReducer,
});
export default allReducers;
