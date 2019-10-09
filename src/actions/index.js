import * as types from "../constants";

const handleClick = i => ({
  type: types.HANDLE_CLICK,
  i,
});
const playAgain = () => ({
  type: types.playAgain,
});
const jumpTo = step => ({
  type: types.JUMP_TO,
  step,
});
const sort = () => ({
  type: types.SORT,
});
export {handleClick, playAgain, jumpTo, sort};
