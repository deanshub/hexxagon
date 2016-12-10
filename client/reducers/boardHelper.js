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
