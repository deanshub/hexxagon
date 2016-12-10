import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import style from './style.css'

export default class EmptyColumn extends Component {
  render(){
    return (
      <div className={classnames(style.emptyColumn)}/>
    )
  }
}
