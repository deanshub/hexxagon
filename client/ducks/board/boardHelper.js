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

export const putPawn = (board, {x,y}, pawnData)=>{
  const oldColumn = board[x-1]
  const newColumn = [
    ...oldColumn.slice(0, y-1),
    pawnData,
    ...oldColumn.slice(y),
  ]
  const newBoard = [
    ...board.slice(0, x-1),
    newColumn,
    ...board.slice(x),
  ]
  return newBoard
}
export const duplicatePawn = (board, {x,y}, pawnData)=>{
  let newBoard = putPawn(board, {x,y}, pawnData)
  const pawnAt1 = newBoard[x+1][y]
  const pawnAt2 = newBoard[x+1][y+1]
  const pawnAt3 = newBoard[x][y+1]
  const pawnAt4 = newBoard[x-1][y]
  const pawnAt5 = newBoard[x-1][y-1]
  const pawnAt6 = newBoard[x][y-1]
  if (pawnAt1 && pawnAt1.player && pawnAt1.player!==0 && pawnAt1.player!==pawnData.player){
    newBoard = putPawn(newBoard, {x:x+1,y}, pawnData)
  }else if (pawnAt2 && pawnAt2.player && pawnAt2.player!==0 && pawnAt2.player!==pawnData.player){
    newBoard = putPawn(newBoard, {x:x+1,y:y+1}, pawnData)
  }else if (pawnAt3 && pawnAt3.player && pawnAt3.player!==0 && pawnAt3.player!==pawnData.player){
    newBoard = putPawn(newBoard, {x,y:y+1}, pawnData)
  }else if (pawnAt4 && pawnAt4.player && pawnAt4.player!==0 && pawnAt4.player!==pawnData.player){
    newBoard = putPawn(newBoard, {x:x-1,y}, pawnData)
  }else if (pawnAt5 && pawnAt5.player && pawnAt5.player!==0 && pawnAt5.player!==pawnData.player){
    newBoard = putPawn(newBoard, {x:x-1,y:y-1}, pawnData)
  }else if (pawnAt6 && pawnAt6.player && pawnAt6.player!==0 && pawnAt6.player!==pawnData.player){
    newBoard = putPawn(newBoard, {x,y:y-1}, pawnData)
  }
  return newBoard
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

  return duplicatePawn(boardWithoutSource, {x:xDest,y: yDest}, pawnData)
}
