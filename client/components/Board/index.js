import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import style from './style.css'
import Column from '../Column'
import EmptyColumn from '../Column/emptyColumn'

export default class Board extends Component {
  static propTypes = {
    data: PropTypes.array,
  }

  static defaultProps = {
    data: [],
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
      <div className={classnames(style.container)}>
        {
          data.map((column, index)=>
            <Column
                data={column}
                key={index}
            />
          )
        }
        <EmptyColumn/>
      </div>
    )
  }
}
