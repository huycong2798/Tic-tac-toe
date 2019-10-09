import React from "react";
import "./Game.css";
import Board from "../component/Board";

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
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.sort = this.sort.bind(this);
    this.playAgain = this.playAgain.bind(this);
  }

  handleClick(i) {
    const sta = this.state;
    const history = sta.history.slice(0, sta.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = sta.xIsNext ? "X" : "O";
    this.setState(prevState => ({
      history: history.concat([
        {
          squares,
          position: {x: Math.floor(i / nRow), y: i % nRow},
        },
      ]),
      stepNumber: history.length,
      xIsNext: !prevState.xIsNext,
    }));
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  sort() {
    this.setState(prevState => ({isAscending: !prevState.isAscending}));
  }

  playAgain() {
    this.setState({
      history: [
        {
          squares: Array(nRow).fill(null),
          position: null,
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      isAscending: true,
    });
  }

  render() {
    const sta = this.state;
    const {history} = sta;
    const current = history[sta.stepNumber];
    const winner = calculateWinner(current.squares);

    let moves = history.map((step, move) => {
      const desc = move
        ? `Go to move #${move} (${step.position.x},${step.position.y})`
        : "Go to game start";
      return sta.stepNumber === move ? (
        <li key={move.id}>
          <button type="button" className="btn-bold" onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      ) : (
        <li key={move.id}>
          <button type="button" onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });
    if (!sta.isAscending) {
      moves = moves.reverse();
    }
    let status;
    if (winner) {
      status = `Winner: ${winner.val}`;
    } else {
      status = `Next player: ${sta.xIsNext ? "X" : "O"}`;
    }
    const info = sta.isAscending ? "Descending" : "Ascending";
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            winner={winner}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
            <button type="button" onClick={this.playAgain}>
              Play Again
            </button>
          </div>
          <ol>
            <button type="button" className="btn-underline" onClick={this.sort}>
              Sort {info}
            </button>{" "}
            {moves}
          </ol>
        </div>
      </div>
    );
  }
}

export default Game;
