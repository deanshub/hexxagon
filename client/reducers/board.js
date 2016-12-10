
import { handleActions, createAction } from 'redux-actions'
import boardInitialState from './boardInitialState'

const initialState = boardInitialState

export default handleActions({
  'select pawn' (state, action) {
    let suggestClose = false
    let suggestFar = false
    console.log(state)
    // action.payload.x
    // action.payload.y

    return state.map((column, columnIndex)=>{
      const x = columnIndex + 1
      if (x+1===action.payload.x || x-1===action.payload.x || x===action.payload.x){
        suggestClose = true
      }else if(x+2===action.payload.x || x-2===action.payload.x){
        suggestFar = true
      }

      if (suggestClose||suggestFar){
        return column.map((cell, cellIndex)=>{
          const y = cellIndex + 1
          if (y+1===action.payload.y || y-1===action.payload.y || y===action.payload.y){
            if (y===action.payload.y && x===action.payload.x){
              return Object.assign({}, cell, {selected: true})
            }else if (suggestClose){
              return Object.assign({}, cell, {suggestClose: true})
            }else{
              return Object.assign({}, cell, {suggestFar: true})
            }
          }else if(suggestClose && (y+2===action.payload.y || y-2===action.payload.y)){
            return Object.assign({}, cell, {suggestFar: true})
          }else{
            return cell
          }
        })
      }else{
        return column
      }
    })
  },
}, initialState)

export const selectPawn = createAction('select pawn')
