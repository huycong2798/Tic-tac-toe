import React from 'react'
import Square from './Square.js'
const nRow = 20;
class Board extends React.Component {
  renderSquare(key, isEnd, isWin) {
    return (
      <Square
        value={this.props.squares[key]}
        onClick={() => this.props.onClick(key)}
        key={key}
        isEnd={isEnd}
        isWin={isWin}
      />
    );
  }
  createBoard() {
    let rows = [];
    let infoWinner = this.props.winner;
    for (var i = 0; i < nRow; i++) {
      let squares = [];
      for (var j = 0; j < nRow; j++) {
        let isWin = false;
        let isEnd = false;
        let pos = nRow * i + j;
        if (infoWinner) {
          isEnd = true;
          if (pos === infoWinner.pos || pos === infoWinner.pos + infoWinner.numJump || pos === infoWinner.pos + 2 * infoWinner.numJump
            || pos === infoWinner.pos + 3 * infoWinner.numJump || pos === infoWinner.pos + 4 * infoWinner.numJump) {
            isWin = true
          }
        }
        squares.push(this.renderSquare(pos, isEnd, isWin));
      }
      rows.push(<div className="board-row" key={i + 'Id'} >{squares}</div>);
    }
    return rows;
  }
  render() {



    return (
      <div>

        {this.createBoard()}
      </div>
    );

  }
}
export default Board;