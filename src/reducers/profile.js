import {userConstants} from "../constants/Account";

const initialState = {
  isUpdating: false,
};
const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.EDIT_REQUEST: {
      return {
        ...state,
        isUpdating: true,
      };
    }

    case userConstants.EDIT_SUCCESS:
      return initialState;
    case userConstants.EDIT_FAILURE:
      return initialState;
    default:
      return state;
  }
};
export default profileReducer;
