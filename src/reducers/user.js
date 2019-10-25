import {userConstants} from "../constants/Account";

const user = JSON.parse(localStorage.getItem("user"));
// const token = JSON.parse(localStorage.getItem("token"));
const initialState = user ? {isLogged: true, loading: false, user} : {isLogged: false};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.GETME_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.GETME_SUCCESS:
      return initialState;
    case userConstants.GETME_FAILURE:
      return {
        error: action.error,
      };
    case userConstants.LOGOUT:
      return {
        isLogged: false,
      };
    default:
      return state;
  }
};
export default userReducer;
