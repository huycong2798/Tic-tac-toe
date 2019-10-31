import {combineReducers} from "redux";
import gameReducer from "./Game";
import registerReducer from "./register";
import alertReducer from "./alert";
import loginReducer from "./login";
import userReducer from "./user";
import profileReducer from "./profile";

const allReducers = combineReducers({
  gameReducer,
  registerReducer,
  alertReducer,
  loginReducer,
  userReducer,
  profileReducer,
});
export default allReducers;
