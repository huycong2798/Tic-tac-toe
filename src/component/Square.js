import React from 'react'
function Square(props) {
    let corlorValue = 'square btn-hover'
    if(props.isEnd)
    {
        corlorValue = 'square'
    }
    if (props.value === 'X')
    {
      corlorValue = 'square isXNext'
    }
    if (props.value === 'O')
    {
      corlorValue = 'square isONext'
    }
    if (props.isWin)
    {
        corlorValue += ' highlight'
    }
    return (
      <button className={corlorValue} onClick={props.onClick}>
        {props.value}
      </button>
    );
}
export default Square;