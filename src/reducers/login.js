import {userConstants} from "../constants/Account";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? {loggedIn: true, user} : {loggingIN: false};
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST: {
      return {
        ...state,
        loggingIN: true,
      };
    }

    case userConstants.LOGIN_SUCCESS:
      return initialState;
    case userConstants.LOGIN_FAILURE:
      return initialState;
    case userConstants.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
export default loginReducer;
