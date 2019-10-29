const nRow = 20;
const getAvailableMoves = squares => {
  console.log("getBoard---", squares);
  const available = [];
  for (let i = 0; i < squares.length; i += 1) {
    if (squares[i] === null) {
      available.push(i);
    }
  }
  return available;
};
const aiMove = (squares, position) => {
  const moves = getAvailableMoves(squares);
  let randomChoice = moves[Math.floor(Math.random() * moves.length)];
  const lastMove = position.x * nRow + position.y;
  const start = lastMove - nRow - 1;
  const end = lastMove + nRow + 1;
  const goodMoves = [];
  console.log("start", start, end);
  for (let i = start; i <= end; i += 1) {
    if (
      moves.includes(i) &&
      (i === start ||
        i === end ||
        i === start + 1 ||
        i === start + 2 ||
        i === end - 1 ||
        i === end - 2 ||
        i === lastMove - 1 ||
        i === lastMove - 2)
    ) {
      goodMoves.push(i);
    }
  }
  if (goodMoves.length > 0) {
    console.log("yeahhh", goodMoves);
    randomChoice = goodMoves[Math.floor(Math.random() * goodMoves.length)];
  }
  return randomChoice;
};
export default aiMove;
