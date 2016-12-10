import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import style from './style.css'
import Column from '../Column'
import EmptyColumn from '../Column/emptyColumn'
import * as boardHelper from '../../reducers/boardHelper'

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
            const x = index+1
            if (selectedPawn && boardHelper.isSuggested({x,y:0},{x:selectedPawn.x,y:0})!==undefined){
              return (
                <Column
                    data={column}
                    key={index}
                    selectPawn={selectPawn}
                    selectedPawn={selectedPawn}
                    x={x}
                />
              )
            }else{
              return (
                <Column
                    data={column}
                    key={index}
                    selectPawn={selectPawn}
                    x={x}
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
