import * as types from "../constants";

const nRow = 20;

function isEnd(squares, numJump) {
  let pos = -1;
  for (let i = 0; i < squares.length; i += 1) {
    if (
      squares[i] &&
      squares[i] === squares[i + numJump] &&
      squares[i] === squares[i + 2 * numJump] &&
      squares[i] === squares[i + 3 * numJump] &&
      squares[i] === squares[i + 4 * numJump] &&
      squares[i]
    ) {
      if (i % nRow === 0 || (i + 5 * numJump) % nRow === 0) {
        pos = i;
        break;
      } else if (squares[i - 1 * numJump] == null && squares[i + 5 * numJump] == null) {
        pos = i;
        break;
      } else if (squares[i - 1 * numJump] !== squares[i + 5 * numJump]) {
        pos = i;
        break;
      }
    }
  }

  if (pos !== -1) {
    return {val: squares[pos], pos, numJump};
  }
  return null;
}

function calculateWinner(squares) {
  return (
    isEnd(squares, 1) ||
    isEnd(squares, nRow) ||
    isEnd(squares, nRow + 1) ||
    isEnd(squares, nRow - 1)
  );
}
const initialState = {
  history: [
    {
      squares: Array(nRow).fill(null),
      position: null,
    },
  ],
  stepNumber: 0,
  xIsNext: true,
  isAscending: true,
};
const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.HANDLE_CLICK: {
      const {history} = state;
      const {stepNumber} = state;
      const {xIsNext} = state;

      const {i} = action;
      const histories = history.slice(0, stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();

      if (calculateWinner(squares) || squares[i]) {
        return state;
      }
      squares[i] = xIsNext ? "X" : "O";
      const newState = {
        ...state,
        histor: histories.concat([
          {
            squares,
            position: {x: Math.floor(i / nRow), y: i % nRow},
          },
        ]),
        stepNumber: histories.length,
        xIsNext: !xIsNext,
      };
      return newState;
    }
    case types.SORT: {
      const {isAscending} = state;
      return {
        ...state,
        isAscending: !isAscending,
      };
    }

    case types.PLAY_AGAIN:
      return state;
    case types.JUMP_TO: {
      const {step} = action;
      return {
        ...state,
        stepNumber: step,
        xIsNext: step % 2 === 0,
      };
    }

    default:
      return state;
  }
};
export default gameReducer;
