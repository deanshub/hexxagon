export const SELECTED = 'selected'
export const SUGGEST_CLOSE = 'suggestClose'
export const SUGGEST_FAR = 'suggestFar'

export const isSuggested = ({x:x1,y:y1}, {x:x2,y:y2})=>{
  const xDist = Math.abs(x2-x1)
  const yDist = Math.abs(y2-y1)
  const totalDist = xDist+yDist

  if (totalDist === 0){
    return SELECTED
  }else if (totalDist === 1){
    return SUGGEST_CLOSE
  }else if (totalDist === 2){
    return SUGGEST_FAR
  }
}

export const duplicatePawn = (board, {x,y}, pawnData)=>{
  const oldColumn = board[x-1]
  const newColumn = [
    ...oldColumn.slice(0, y-1),
    pawnData,
    ...oldColumn.slice(y),
  ]
  return [
    ...board.slice(0, x-1),
    newColumn,
    ...board.slice(x),
  ]
}
export const movePawn = (board, {x:xDest,y:yDest}, pawnData, {x:xSource,y:ySource})=>{
  const oldColumnSource = board[xSource-1]
  const newColumnSource = [
    ...oldColumnSource.slice(0, ySource-1),
    {player:0},
    ...oldColumnSource.slice(ySource),
  ]
  const boardWithoutSource = [
    ...board.slice(0, xSource-1),
    newColumnSource,
    ...board.slice(xSource),
  ]

  const oldColumnDest = boardWithoutSource[xDest-1]
  const newColumnDest = [
    ...oldColumnDest.slice(0, yDest-1),
    pawnData,
    ...oldColumnDest.slice(yDest),
  ]
  return [
    ...boardWithoutSource.slice(0, xDest-1),
    newColumnDest,
    ...boardWithoutSource.slice(xDest),
  ]
}
