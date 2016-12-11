
import { handleActions, createAction } from 'redux-actions'
import boardInitialState from './boardInitialState'
import * as boardHelper from './boardHelper'

const initialState = boardInitialState

export default handleActions({
  'select pawn' (state, action) {
    const selectedPawn = action.payload
    const statePawnData = state.data[selectedPawn.x-1][selectedPawn.y-1]

    if (statePawnData && statePawnData.player!==0 && statePawnData.player!==undefined){
      return Object.assign({}, state, {selectedPawn})
    }else if (state.selectedPawn){
      const selectedPawnData = state.data[state.selectedPawn.x-1][state.selectedPawn.y-1]

      const suggestion = boardHelper.isSuggested(state.selectedPawn, selectedPawn)
      if(suggestion === boardHelper.SUGGEST_CLOSE){
        return Object.assign({}, state,{
          data: boardHelper.duplicatePawn(state.data, selectedPawn, selectedPawnData),
          selectedPawn: undefined,
        })
      }else if(suggestion === boardHelper.SUGGEST_FAR){
        return Object.assign({}, state,{
          data: boardHelper.movePawn(state.data, selectedPawn, selectedPawnData, state.selectedPawn),
          selectedPawn: undefined,
        })
      }
    }
    return Object.assign({}, state, {selectedPawn:undefined})
  },
}, initialState)

export const selectPawn = createAction('select pawn')
