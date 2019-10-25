import {combineReducers} from "redux";
import gameReducer from "./Game";
import registerReducer from "./register";
import alertReducer from "./alert";
import loginReducer from "./login";
import userReducer from "./user";

const allReducers = combineReducers({
  gameReducer,
  registerReducer,
  alertReducer,
  loginReducer,
  userReducer,
});
export default allReducers;
