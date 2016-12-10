
import { handleActions, createAction } from 'redux-actions'
import boardInitialState from './boardInitialState'
import * as boardHelper from './boardHelper'

const initialState = boardInitialState

export default handleActions({
  'select pawn' (state, action) {
    const selectedPawn = action.payload
    const statePawnData = state[selectedPawn.x-1][selectedPawn.y-1]

    if (statePawnData && statePawnData.player!==0){
      return state.map((column, columnIndex)=>{
        return column.map((cell, cellIndex)=>{
          if (cell && cell.player!==undefined){
            const suggested =
              boardHelper.isSuggested(selectedPawn, {x:columnIndex+1, y:cellIndex+1})
            if (suggested===boardHelper.SELECTED){
              return Object.assign({}, cell, {[boardHelper.SELECTED]: true})
            }else if(suggested===boardHelper.SUGGEST_FAR){
              return Object.assign({}, cell, {[boardHelper.SUGGEST_FAR]: true})
            }else if(suggested===boardHelper.SUGGEST_CLOSE){
              return Object.assign({}, cell, {[boardHelper.SUGGEST_CLOSE]: true})
            }
          }
          return Object.assign({}, cell, {
            [boardHelper.SELECTED]: false,
            [boardHelper.SUGGEST_CLOSE]: false,
            [boardHelper.SUGGEST_FAR]: false,
          })
        })
      })
    }
    return state
  },
}, initialState)

export const selectPawn = createAction('select pawn')
