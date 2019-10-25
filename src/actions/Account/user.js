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

        dispatch(alertActions.success("Registration successful"));

        setTimeout(() => {
          // eslint-disable-next-line no-restricted-globals
          location.reload(true);
        }, 2000);
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
const getMe = () => {
  const request = () => {
    return {type: userConstants.GETME_REQUEST};
  };
  const success = user => {
    return {type: userConstants.GETME_SUCCESS, user};
  };
  const failure = error => {
    return {type: userConstants.GETME_FAILURE, error};
  };
  return dispatch => {
    dispatch(request());

    userService.getMe().then(
      user => {
        dispatch(success(user));
        localStorage.setItem("user", JSON.stringify(user));
      },
      error => dispatch(failure(error.toString()))
    );
  };
};
const logout = () => {
  userService.logout();
  return {type: userConstants.LOGOUT};
};
const userActions = {
  register,
  login,
  getMe,
  logout,
};
export default userActions;
