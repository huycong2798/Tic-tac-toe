import {createBrowserHistory} from "history";

import {userConstants} from "../../constants/Account";
import alertActions from "./alert";
import userService from "../../services";

const history = createBrowserHistory();

const register = user => {
  const request = () => {
    return {type: userConstants.REGISTER_REQUEST, user};
  };
  const success = () => {
    return {type: userConstants.REGISTER_SUCCESS, user};
  };
  const failure = error => {
    return {type: userConstants.REGISTER_FAILURE, error};
  };
  return dispatch => {
    dispatch(request(user));
    userService.register(user).then(
      () => {
        dispatch(success());
        history.push("/login");
        console.log(user);
        dispatch(alertActions.success("Registration successful"));
      },
      error => {
        console.log(error);
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
};
const userActions = {
  register,
};
export default userActions;
