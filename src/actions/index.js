import * as types from "../constants";

const handleClick = () => ({
  type: types.HANDLE_CLICK,
});
const playAgain = () => ({
  type: types.playAgain,
});
const jumpTo = () => ({
  type: types.JUMP_TO,
});
const sort = () => ({
  type: types.SORT,
});
export {handleClick, playAgain, jumpTo, sort};
