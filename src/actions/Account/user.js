import history from "../../helper/history";

import {userConstants} from "../../constants/Account";
import alertActions from "./alert";
import userService from "../../services";

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
const edit = info => {
  const request = () => {
    return {type: userConstants.EDIT_REQUEST, info};
  };
  const success = () => {
    return {type: userConstants.EDIT_SUCCESS, info};
  };
  const failure = error => {
    return {type: userConstants.EDIT_FAILURE, error};
  };
  return dispatch => {
    dispatch(request(info));
    userService.edit(info).then(
      () => {
        dispatch(success());
        dispatch(getMe());
        dispatch(alertActions.success("Edited successfully"));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
};
const register = (user, sigInWithSocial = false) => {
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
        if (sigInWithSocial) {
          console.log("a", user);
          dispatch(login(user.email, user.password));
        } else {
          dispatch(success());
          history.push("/login");

          dispatch(alertActions.success("Registration successful"));
        }
      },
      error => {
        if (sigInWithSocial) {
          dispatch(login(user.email, user.password));
        } else {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      }
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
  edit,
};
export default userActions;
