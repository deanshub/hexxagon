
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import playerAcations from './playerAcations'
import board from './board'

export default combineReducers({
  routing,
  playerAcations,
  board,
})
