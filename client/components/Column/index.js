import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import style from './style.css'
import Cell from '../Cell'
import EmptyCell from '../Cell/EmptyCell'
import * as boardHelper from '../../ducks/board/boardHelper'

export default class Column extends Component {
  static propTypes = {
    data: PropTypes.array,
    selectPawn: PropTypes.func,
    selectedPawn: PropTypes.object,
    x: PropTypes.number.isRequired,
  }

  static defaultProps = {
    selectedPawn:{},
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
    if (length%2===0){
      return (<EmptyCell/>)
    }
  }
  render() {
    const {data, selectPawn, selectedPawn, x} = this.props

    let initialEmpty = 0
    let cell = data[initialEmpty]
    while (initialEmpty<data.length && cell===undefined){
      initialEmpty++
      cell = data[initialEmpty]
    }

    const reversedData = [...data].reverse()
    let lastEmpty = 0
    cell = reversedData[lastEmpty]

    while (lastEmpty<reversedData.length && cell===undefined){
      lastEmpty++
      cell = reversedData[lastEmpty]
    }

    return (
      <div className={classnames(style.container)}>
        {(new Array(initialEmpty).fill(0)).map(()=><EmptyCell/>)}
        {(new Array(lastEmpty).fill(0)).map(()=><EmptyCell/>)}
        {
          data.slice(initialEmpty, data.length-lastEmpty).map((cell, index)=>{
            const suggestion = boardHelper.isSuggested(selectedPawn, {x,y:index+initialEmpty})
            return (
              <Cell
                  data={cell}
                  key={index+initialEmpty}
                  selectPawn={selectPawn}
                  selected={suggestion===boardHelper.SELECTED}
                  suggestClose={suggestion===boardHelper.SUGGEST_CLOSE}
                  suggestFar={suggestion===boardHelper.SUGGEST_FAR}
                  x={x}
                  y={index+initialEmpty}
              />
            )
          })
        }
        {(new Array(initialEmpty).fill(0)).map(()=><EmptyCell/>)}
        {(new Array(lastEmpty).fill(0)).map(()=><EmptyCell/>)}
      </div>
    )
  }
}
