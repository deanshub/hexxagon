import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import style from './style.css'
import Column from '../Column'
import EmptyColumn from '../Column/emptyColumn'
import * as boardHelper from '../../ducks/board/boardHelper'

export default class Board extends Component {
  static propTypes = {
    data: PropTypes.array,
    selectPawn: PropTypes.func,
    selectedPawn: PropTypes.object,
    turn: PropTypes.string,
  }

  static defaultProps = {
    data: [],
  }

  render() {
    const {data, selectPawn, selectedPawn} = this.props

    return (
      <div className={classnames(style.container)}>
        {
          data.map((column, index)=>{
            if (selectedPawn && boardHelper.isSuggested({x:index,y:0},{x:selectedPawn.x,y:0})!==undefined){
              return (
                <Column
                    data={column}
                    key={index}
                    selectPawn={selectPawn}
                    selectedPawn={selectedPawn}
                    x={index}
                />
              )
            }else{
              return (
                <Column
                    data={column}
                    key={index}
                    selectPawn={selectPawn}
                    x={index}
                />
              )
            }
          })
        }
        <EmptyColumn/>
      </div>
    )
  }
}
