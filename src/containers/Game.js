import React from "react";
import {connect} from "react-redux";
import * as actions from "../actions";
import "./Game.css";
import Board from "../component/Board";

// const nRow = 20;

// function isEnd(squares, numJump) {
//   let pos = -1;
//   for (let i = 0; i < squares.length; i += 1) {
//     if (
//       squares[i] &&
//       squares[i] === squares[i + numJump] &&
//       squares[i] === squares[i + 2 * numJump] &&
//       squares[i] === squares[i + 3 * numJump] &&
//       squares[i] === squares[i + 4 * numJump] &&
//       squares[i]
//     ) {
//       if (i % nRow === 0 || (i + 5 * numJump) % nRow === 0) {
//         pos = i;
//         break;
//       } else if (squares[i - 1 * numJump] == null && squares[i + 5 * numJump] == null) {
//         pos = i;
//         break;
//       } else if (squares[i - 1 * numJump] !== squares[i + 5 * numJump]) {
//         pos = i;
//         break;
//       }
//     }
//   }

//   if (pos !== -1) {
//     return {val: squares[pos], pos, numJump};
//   }
//   return null;
// }

// function calculateWinner(squares) {
//   return (
//     isEnd(squares, 1) ||
//     isEnd(squares, nRow) ||
//     isEnd(squares, nRow + 1) ||
//     isEnd(squares, nRow - 1)
//   );
// }
class Game extends React.PureComponent {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     history: [
  //       {
  //         squares: Array(nRow).fill(null),
  //         position: null,
  //       },
  //     ],
  //     stepNumber: 0,
  //     xIsNext: true,
  //     isAscending: true,
  //   };
  //   this.sort = this.sort.bind(this);
  //   this.playAgain = this.playAgain.bind(this);
  // }

  // handleClick(i) {
  //   const sta = this.state;
  //   const history = sta.history.slice(0, sta.stepNumber + 1);
  //   const current = history[history.length - 1];
  //   const squares = current.squares.slice();
  //   if (calculateWinner(squares) || squares[i]) {
  //     return;
  //   }
  //   squares[i] = sta.xIsNext ? "X" : "O";
  //   this.setState(prevState => ({
  //     history: history.concat([
  //       {
  //         squares,
  //         position: {x: Math.floor(i / nRow), y: i % nRow},
  //       },
  //     ]),
  //     stepNumber: history.length,
  //     xIsNext: !prevState.xIsNext,
  //   }));
  // }

  // jumpTo(step) {
  //   this.setState({
  //     stepNumber: step,
  //     xIsNext: step % 2 === 0,
  //   });
  // }

  // sort() {
  //   this.setState(prevState => ({isAscending: !prevState.isAscending}));
  // }

  // playAgain() {
  //   this.setState({
  //     history: [
  //       {
  //         squares: Array(nRow).fill(null),
  //         position: null,
  //       },
  //     ],
  //     stepNumber: 0,
  //     xIsNext: true,
  //     isAscending: true,
  //   });
  // }

  render() {
    const prop = this.props;
    const game = prop.Game;
    const {history} = game;
    const {stepNumber} = game;
    const {xIsNext} = game;
    const {isAscending} = game;
    const {winner} = game;
    const current = history[stepNumber];
    const {squares} = current;
    let moves = history.map((step, move) => {
      const desc = move
        ? `Go to move #${move} (${step.position.x},${step.position.y})`
        : "Go to game start";
      const show = stepNumber === move ? "btn-bold" : "";
      return (
        <li key={move.id}>
          <button type="button" className={show} onClick={() => prop.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });
    if (!isAscending) {
      moves = moves.reverse();
    }
    let status;
    if (winner) {
      status = `Winner: ${winner.val}`;
    } else {
      status = `Next player: ${xIsNext ? "X" : "O"}`;
    }
    const info = isAscending ? "Descending" : "Ascending";
    return (
      <div className="game">
        <div className="game-board">
          <Board onClick={i => prop.handleClick(i)} squares={squares} winner={winner} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
            <button type="button" className="btn-underline" onClick={prop.playAgain}>
              Play Again
            </button>
          </div>
          <ol>
            <button type="button" className="btn-underline" onClick={prop.sort}>
              Sort {info}
            </button>{" "}
            {moves}
          </ol>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  Game: state.Game,
});
const mapDispatchToProps = dispatch => ({
  handleClick: i => {
    dispatch(actions.handleClick(i));
  },
  playAgain: () => {
    dispatch(actions.playAgain());
  },
  jumpTo: move => {
    dispatch(actions.jumpTo(move));
  },
  sort: () => {
    dispatch(actions.sort());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
