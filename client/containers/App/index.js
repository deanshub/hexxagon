import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classnames from 'classnames'
import Board from '../../components/Board'
import style from './style.css'
import * as BoardActions from '../../ducks/board'

class App extends Component {
  render() {
    // const { board, actions, children } = this.props
    const { board, actions } = this.props

    return (
      <div className={classnames(style.container)}>
        <Board
            data={board.data}
            selectPawn={actions.selectPawn}
            selectedPawn={board.selectedPawn}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    board: state.board,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(BoardActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
