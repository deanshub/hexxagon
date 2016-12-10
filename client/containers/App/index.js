
import React, { Component } from 'react'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classnames from 'classnames'
import Board from '../../components/Board'
import style from './style.css'

class App extends Component {
  render() {
    // const { board, actions, children } = this.props
    const { board } = this.props

    return (
      <div className={classnames(style.container)}>
        <Board data={board} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    board: state.board,
  }
}

function mapDispatchToProps() {
// function mapDispatchToProps(dispatch) {
  return {
    // actions: bindActionCreators(TodoActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
