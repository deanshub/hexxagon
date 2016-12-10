import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import style from './style.css'
import Cell from '../Cell'
import EmptyCell from '../Cell/EmptyCell'

export default class Column extends Component {
  static propTypes = {
    data: PropTypes.array,
    selectPawn: PropTypes.func,
    x: PropTypes.number.isRequired,
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
  getEmptyCellIfNeeded(length){
    if (length%2==0){
      return (<EmptyCell/>)
    }
  }
  render() {
    const {data, selectPawn, x} = this.props

    return (
      <div className={classnames(style.container)}>
        {this.getEmptyCellIfNeeded(data.length)}
        {
          data.map((cell, index)=>
            <Cell
                data={cell}
                key={index}
                selectPawn={selectPawn}
                x={x}
                y={index+1}
            />
          )
        }
        {this.getEmptyCellIfNeeded(data.length)}
      </div>
    )
  }
}
