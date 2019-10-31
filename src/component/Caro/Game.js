import React from "react";
import Board from "./Board";
import aiMove from "./aiHandle";

class Game extends React.PureComponent {
  componentDidMount() {
    console.log("queocuteeeee");
  }

  // eslint-disable-next-line camelcase
  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    const game = nextProps.Game;
    const {history, xIsNext} = game;
    const {stepNumber} = game;
    const current = history[stepNumber];
    const {squares, position} = current;
    if (!xIsNext) {
      console.log("current----", position.x);
      const move = aiMove(squares, position);
      setTimeout(() => {
        nextProps.handleClick(move);
      }, 500);
    }
  }

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
export default Game;
