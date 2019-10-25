import {userConstants} from "../constants/Account";

const initialState = {isLogging: false};
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST: {
      return {
        ...state,
        isLogging: true,
      };
    }

    case userConstants.LOGIN_SUCCESS:
      return initialState;
    case userConstants.LOGIN_FAILURE:
      return initialState;
    default:
      return state;
  }
};
export default loginReducer;
