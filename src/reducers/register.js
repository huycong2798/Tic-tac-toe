import {userConstants} from "../constants/Account";

const initialState = {
  registering: false,
};
const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST: {
      return {
        ...state,
        registering: true,
      };
    }

    case userConstants.REGISTER_SUCCESS:
      return initialState;
    case userConstants.REGISTER_FAILURE:
      return initialState;
    default:
      return state;
  }
};
export default registerReducer;
