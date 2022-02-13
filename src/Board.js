import './Board.css';
import React, { createRef } from 'react';
import BoardBox from './BoardBox';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      boxHeight: null
    };

    this.intializeBoard();
  }

  intializeBoard() {
    this.boardStatus = {
      box1: '',
      box2: '',
      box3: '',
      box4: '',
      box5: '',
      box6: '',
      box7: '',
      box8: '',
      box9: ''
    };

    this.winnerBoxes = [];
    this.moves = 0;
    this.isOver = false;
  }

  componentDidUpdate(prevProps, prevState) {
    // if (prevProps.isOver && !this.props.isOver) {
    //   console.log('Board reset');
    if (this.isOver) {
      this.intializeBoard();
    }
    // }
  }

  registerTurn = (id, symbol) => {
    console.log(id);
    if (!this.boardStatus[id]) {
      this.moves = this.moves + 1;
      this.boardStatus[id] = symbol;

      if (this.moves >= 5) {
        this.isOver = this.checkWinner();
        if (this.moves == 9 && !this.isOver) {
          this.isOver = true;
          this.props.declareDraw();
        } else {
          this.isOver ? this.props.declareWinner() : this.props.changePlayer();
        }
      } else {
        this.props.changePlayer();
      }
    } else {
      this.props.onWrongMove(this.boardStatus[id]);
    }
  };

  checkWinner = () => {
    if (
      this.checkRow(1, 2, 3) ||
      this.checkRow(4, 5, 6) ||
      this.checkRow(7, 8, 9) ||
      this.checkRow(1, 4, 7) ||
      this.checkRow(2, 5, 8) ||
      this.checkRow(3, 6, 9) ||
      this.checkRow(1, 5, 9) ||
      this.checkRow(3, 5, 7)
    ) {
      return true;
    } else {
      return false;
    }
  };

  checkRow = (x, y, z) => {
    if (
      this.boardStatus[`box${x}`] &&
      this.boardStatus[`box${y}`] &&
      this.boardStatus[`box${z}`] &&
      this.boardStatus[`box${x}`] == this.boardStatus[`box${y}`] &&
      this.boardStatus[`box${y}`] == this.boardStatus[`box${z}`]
    ) {
      this.winnerBoxes.push(`box${x}`);
      this.winnerBoxes.push(`box${y}`);
      this.winnerBoxes.push(`box${z}`);
      return true;
    } else {
      return false;
    }
  };

  setHeight = (boxHeight) => {
    this.setState({ boxHeight });
  };

  renderBoard = () => {
    let i, id;
    let boardBoxes = [];
    for (i = 1; i <= 9; i++) {
      id = `box${i}`;
      boardBoxes.push(
        <BoardBox
          key={id}
          id={id}
          boxHeight={this.state.boxHeight}
          setHeight={this.setHeight}
          registerTurn={this.registerTurn}
          player={this.props.currentPlayer}
          isWinner={this.winnerBoxes.includes(id)}
          isOver={this.props.isOver}
        ></BoardBox>
      );
    }
    return boardBoxes;
  };

  render() {
    return <div className="playing-board">{this.renderBoard()}</div>;
  }
}

export default Board;
