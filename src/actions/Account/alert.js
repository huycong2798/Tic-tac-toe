import {alertConstants} from "../../constants/Account";

const success = message => {
  return {type: alertConstants.SUCCESS, message};
};

const error = message => {
  return {type: alertConstants.ERROR, message};
};

const clear = () => {
  return {type: alertConstants.CLEAR};
};

const alertActions = {
  success,
  error,
  clear,
};
export default alertActions;
