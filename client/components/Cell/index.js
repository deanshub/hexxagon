import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import * as CELLS from '../../constants/cells'
import style from './style.css'

const getCellClasses = (data)=>{
  return {
    [style.cell]: true,
    [style.empty]: data===CELLS.EMPTY,
    [style.blank]: data===CELLS.BLANK,
    [style.player1]: data===CELLS.PLAYER1,
    [style.player2]: data===CELLS.PLAYER2,
  }
}

export default class Cell extends Component {
  static propTypes = {
    data: PropTypes.number,
  }

  // constructor(props, context) {
  //   super(props, context)
  //   this.state = {
  //     editing: false
  //   }
  // }

  // handleDoubleClick() {
  //   this.setState({ editing: true })
  // }

  // handleSave(id, text) {
  //   if (text.length === 0) {
  //     this.props.deleteTodo(id)
  //   } else {
  //     this.props.editTodo({ id, text })
  //   }
  //   this.setState({ editing: false })
  // }

  render() {
    // const {todo, completeTodo, deleteTodo} = this.props
    const {data} = this.props

    return (
      <div className={classnames(getCellClasses(data))}>
      </div>
    )
  }
}
