import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';
import Prompt from './Prompt';
import './index.css';

class App extends React.Component {
  state = { currentPlayer: 1, message: 'Lets Begin', over: false };

  onPlayerChange = () => {
    this.state.currentPlayer == 1
      ? this.setState({ message: '', currentPlayer: 2 })
      : this.setState({ message: '', currentPlayer: 1 });
    console.log(`current player is ${this.state.currentPlayer}`);
  };

  onWrongMove = (symbol) => {
    this.setState({
      message: `Wrong Move, Place is already filled with ${symbol}, TRY AGAIN`
    });
  };

  declareWinner = () => {
    this.setState({
      message: `Player ${this.state.currentPlayer} wins!!!`,
      over: true
    });
  };

  declareDraw = () => {
    this.setState({
      message: 'Match Tied!!',
      over: true
    });
  };

  resetPrompt = () => {
    this.setState({ message: 'Lets Begin', over: false, currentPlayer: 1 });
  };

  render() {
    return (
      <div>
        <div className="header">TIC-TAC-TOE</div>
        <div className="container">
          <Board
            changePlayer={this.onPlayerChange}
            onWrongMove={this.onWrongMove}
            currentPlayer={this.state.currentPlayer}
            declareWinner={this.declareWinner}
            declareDraw={this.declareDraw}
            isOver={this.state.over}
          />
          <Prompt
            isOver={this.state.over}
            currentPlayer={this.state.currentPlayer}
            message={this.state.message}
            reset={this.resetPrompt}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
