import React from 'react'
import './Game.css'
import Board from './Board.js'
const nRow = 20;

  
class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [
          {
            squares: Array(nRow).fill(null),
            position: null
          }
        ],
        stepNumber: 0,
        xIsNext: true,
        isAscending:true
      };
      this.sort = this.sort.bind(this);
      this.playAgain = this.playAgain.bind(this);
    }
  
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        history: history.concat([
            {
                squares: squares,
                position: {x:parseInt(i/nRow),y:i%nRow}
            }
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext
      });
    }
  
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0
      });
    }
    sort() {
      this.setState({isAscending: !this.state.isAscending});
    }
    playAgain() {
      this.setState({history: [
        {
          squares: Array(nRow).fill(null),
          position: null
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      isAscending:true});
    }
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
  
      let moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move + ' (' + step.position.x + ',' + step.position.y + ')' :
          'Go to game start';
        return (this.state.stepNumber === move) ? (
          <li key={move}>
            <button className='btn-bold' onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        ):
        ( 
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });
      if(!this.state.isAscending)
      {
        moves = moves.reverse()
      }
      let status;
      if (winner) {
        status = "Winner: " + winner.val;
      } else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      }
      let info = this.state.isAscending ? 'Descending' : 'Ascending'
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
              
              <button onClick={this.playAgain}>Play Again</button>
            </div>
            <ol><button className='btn-underline' onClick={this.sort}>Sort {info}</button> {moves}</ol>
          </div>
        </div>
      );
    }
}
  
  // ========================================
  
function isEnd(squares,numJump)
{
  //let isWin = null;
  let pos = -1;
     for(let i = 0;i<squares.length;i++)
     {
         if(squares[i]&&squares[i]===squares[i+numJump]&&squares[i]===squares[i+2*numJump]
          &&squares[i]===squares[i+3*numJump]&&squares[i]===squares[i+4*numJump]&&squares[i])
         {
          if(i % nRow === 0 || (i+5*numJump) % nRow === 0)
          {
            pos = i;
             break;
          }
          else
          {
            if(squares[i-1*numJump] == null && squares[i+5*numJump]==null) 
            {
              pos = i;
              break;
            }
            else
            {
              if(squares[i-1*numJump] !== squares[i+5*numJump])
              {
                pos = i;
                break;
              }
            }
            
          }
            
          }
     }
     
    if(pos !== -1)
    {
      return {val: squares[pos],pos:pos,numJump: numJump}
    }
    else
    {
      return null
    }
    
}
function calculateWinner(squares) {
    // return isEndRow(squares)  || isEndCol(squares) || isEndDownDiagonal (squares) 
    return isEnd(squares,1) || isEnd(squares,nRow) || isEnd(squares,nRow+1) || isEnd(squares,nRow-1)
}
export default Game;  