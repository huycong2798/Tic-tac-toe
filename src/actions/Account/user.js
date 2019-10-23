import history from "../../helper/history";

import {userConstants} from "../../constants/Account";
import alertActions from "./alert";
import userService from "../../services";

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
        // eslint-disable-next-line no-restricted-globals
        location.reload(true);
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
const login = (email, password) => {
  const request = user => {
    return {type: userConstants.LOGIN_REQUEST, user};
  };
  const success = user => {
    return {type: userConstants.LOGIN_SUCCESS, user};
  };
  const failure = error => {
    return {type: userConstants.LOGIN_FAILURE, error};
  };
  return dispatch => {
    dispatch(request({email}));

    userService.login(email, password).then(
      user => {
        dispatch(success(user));
        history.push("/");
        // eslint-disable-next-line no-restricted-globals
        location.reload(true);
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
};
const userActions = {
  register,
  login,
};
export default userActions;
