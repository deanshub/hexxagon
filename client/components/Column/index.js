import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import style from './style.css'
import Cell from '../Cell'
import EmptyCell from '../Cell/EmptyCell'
import * as boardHelper from '../../reducers/boardHelper'

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
    if (length%2==0){
      return (<EmptyCell/>)
    }
  }
  render() {
    const {data, selectPawn, selectedPawn, x} = this.props

    return (
      <div className={classnames(style.container)}>
        {this.getEmptyCellIfNeeded(data.length)}
        {
          data.map((cell, index)=>{
            const y = index+1
            const suggestion = boardHelper.isSuggested(selectedPawn, {x,y})
            return (
              <Cell
                  data={cell}
                  key={index}
                  selectPawn={selectPawn}
                  selected={suggestion===boardHelper.SELECTED}
                  suggestClose={suggestion===boardHelper.SUGGEST_CLOSE}
                  suggestFar={suggestion===boardHelper.SUGGEST_FAR}
                  x={x}
                  y={y}
              />
            )
          })
        }
        {this.getEmptyCellIfNeeded(data.length)}
      </div>
    )
  }
}
