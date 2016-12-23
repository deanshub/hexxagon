export const SELECTED = 'selected'
export const SUGGEST_CLOSE = 'suggestClose'
export const SUGGEST_FAR = 'suggestFar'

export const getNighborsXY=(x,y)=>{
  return [
    {x:x+1,y},
    {x:x+1,y:y-1},
    {x,y:y+1},
    {x:x-1,y},
    {x:x-1,y:y-1},
    {x,y:y-1},
  ]
}

export const isSuggestedClose=({x:x1,y:y1},{x:x2,y:y2})=>{
  const nighbors={
    [`${x1+1}${y1}`]: true,
    [`${x1+1}${y1-1}`]: true,
    [`${x1}${y1+1}`]: true,
    [`${x1-1}${y1}`]: true,
    [`${x1-1}${y1-1}`]: true,
    [`${x1}${y1-1}`]: true,
  }

  return nighbors[`${x2}${y2}`]===true
}

export const isSuggested = ({x:x1,y:y1}, {x:x2,y:y2})=>{
  if(x1===x2 && y1===y2){
    return SELECTED
  }else if (isSuggestedClose({x:x1,y:y1}, {x:x2,y:y2})){
    return SUGGEST_CLOSE
  } else{
    const farNighbor = getNighborsXY(x1,y1).filter(point=>{
      return isSuggestedClose(point,{x:x2,y:y2})
    })
    if (farNighbor.length>0){
      console.log(farNighbor);
      return SUGGEST_FAR
    }
  }


  // const xDist = Math.abs(x2-x1)
  // const yDist = Math.abs(y2-y1)
  // const totalDist = xDist+yDist


  // if (totalDist === 0){
  //   return SELECTED
  // }else if (totalDist===1)){
  //   return SUGGEST_CLOSE
  // }
  // else if (totalDist === 2){
  //   return SUGGEST_FAR
  // }
}

export const putPawn = (board, {x,y}, pawnData)=>{
  const oldColumn = board[x]
  const newColumn = [
    ...oldColumn.slice(0, y),
    pawnData,
    ...oldColumn.slice(y+1),
  ]
  const newBoard = [
    ...board.slice(0, x),
    newColumn,
    ...board.slice(x+1),
  ]
  return newBoard
}
export const duplicatePawn = (board, {x,y}, pawnData)=>{
  let newBoard = putPawn(board, {x,y}, pawnData)
  const pawnAt1 = newBoard[x+1]?newBoard[x+1][y]:undefined
  const pawnAt2 = newBoard[x+1]?newBoard[x+1][y-1]:undefined
  const pawnAt3 = newBoard[x]?newBoard[x][y+1]:undefined
  const pawnAt4 = newBoard[x-1]?newBoard[x-1][y]:undefined
  const pawnAt5 = newBoard[x-1]?newBoard[x-1][y-1]:undefined
  const pawnAt6 = newBoard[x]?newBoard[x][y-1]:undefined
  if (pawnAt1 && pawnAt1.player && pawnAt1.player!==0 && pawnAt1.player!==pawnData.player){
    newBoard = putPawn(newBoard, {x:x+1,y}, pawnData)
  }else if (pawnAt2 && pawnAt2.player && pawnAt2.player!==0 && pawnAt2.player!==pawnData.player){
    newBoard = putPawn(newBoard, {x:x+1,y:y-1}, pawnData)
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

export const movePawn = (board, {x:xDest, y:yDest}, pawnData, {x:xSource,y:ySource})=>{
  const oldColumnSource = board[xSource]
  const newColumnSource = [
    ...oldColumnSource.slice(0, ySource),
    {player:0},
    ...oldColumnSource.slice(ySource+1),
  ]
  const boardWithoutSource = [
    ...board.slice(0, xSource),
    newColumnSource,
    ...board.slice(xSource+1),
  ]

  return duplicatePawn(boardWithoutSource, {x:xDest,y: yDest}, pawnData)
}
