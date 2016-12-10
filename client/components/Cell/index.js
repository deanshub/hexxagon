import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import * as CELLS from '../../constants/cells'
import style from './style.css'

const getCellClasses = (value, selected, suggestClose, suggestFar)=>{
  return {
    [style.cell]: true,
    [style.empty]: value===CELLS.EMPTY,
    [style.blank]: value===CELLS.BLANK,
    [style.player1]: value===CELLS.PLAYER1,
    [style.player2]: value===CELLS.PLAYER2,
    [style.selected]: selected,
    [style.suggestClose]: suggestClose,
    [style.suggestFar]: suggestFar,
  }
}

export default class Cell extends Component {
  static propTypes = {
    data: PropTypes.object,
    selectPawn: PropTypes.func,
    // suggestClose: PropTypes.bool,
    // suggestFar: PropTypes.bool,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }
  static defaultProps = {
    data: {},
    // suggestClose: false,
    // suggestFar: false,
  }

  render() {
    // const {todo, completeTodo, deleteTodo} = this.props
    // const {data, selectPawn, x, y, suggestClose, suggestFar} = this.props
    const {data, selectPawn, x, y} = this.props

    return (
      <div
          className={classnames(getCellClasses(data.player, data.selected, data.suggestClose, data.suggestFar))}
          onClick={()=>selectPawn({x, y})}
      />
    )
  }
}
