import React from "react";
import Square from "./Square";

const nRow = 20;
class Board extends React.Component {
  createBoard() {
    const rows = [];
    const property = this.props;
    const infoWinner = property.winner;
    for (let i = 0; i < nRow; i += 1) {
      const squares = [];
      for (let j = 0; j < nRow; j += 1) {
        let isWin = false;
        let isEnd = false;
        const pos = nRow * i + j;
        if (infoWinner) {
          isEnd = true;
          if (
            pos === infoWinner.pos ||
            pos === infoWinner.pos + infoWinner.numJump ||
            pos === infoWinner.pos + 2 * infoWinner.numJump ||
            pos === infoWinner.pos + 3 * infoWinner.numJump ||
            pos === infoWinner.pos + 4 * infoWinner.numJump
          ) {
            isWin = true;
          }
        }
        squares.push(this.renderSquare(pos, isEnd, isWin));
      }
      rows.push(
        <div className="board-row" key={i}>
          {squares}
        </div>
      );
    }
    return rows;
  }

  renderSquare(key, isEnd, isWin) {
    const property = this.props;
    return (
      <Square
        value={property.squares[key]}
        onClick={() => property.onClick(key)}
        key={key}
        isEnd={isEnd}
        isWin={isWin}
      />
    );
  }

  render() {
    return <div>{this.createBoard()}</div>;
  }
}
export default Board;
