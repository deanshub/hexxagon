import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import * as CELLS from '../../constants/cells'
import style from './style.css'

const getCellClasses = (value, selected, suggestClose, suggestFar)=>{
  const blank = value===CELLS.BLANK
  return {
    [style.cell]: true,
    [style.empty]: value===CELLS.EMPTY,
    [style.blank]: blank,
    [style.player1]: value===CELLS.PLAYER1,
    [style.player2]: value===CELLS.PLAYER2,
    [style.selected]: !blank && selected,
    [style.suggestClose]: !blank && suggestClose,
    [style.suggestFar]: !blank && suggestFar,
  }
}

export default class Cell extends Component {
  static propTypes = {
    data: PropTypes.object,
    selectPawn: PropTypes.func,
    selected: PropTypes.bool,
    suggestClose: PropTypes.bool,
    suggestFar: PropTypes.bool,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }
  static defaultProps = {
    data: {},
    suggestClose: false,
    suggestFar: false,
    selected: false,
  }

  render() {
    // const {todo, completeTodo, deleteTodo} = this.props
    const {data, selectPawn, x, y, suggestClose, suggestFar, selected} = this.props
    // const {data, selectPawn, x, y} = this.props

    return (
      <div
          className={classnames(getCellClasses(data.player, selected, suggestClose, suggestFar))}
          onClick={()=>selectPawn({x, y})}
      />
    )
  }
}
