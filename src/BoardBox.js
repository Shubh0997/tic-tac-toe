import React from 'react';
import './BoardBox.css';

class BoardBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = { resetBox: false };

    this.boxRef = React.createRef();

    this.intializeBox();
  }

  intializeBox() {
    this.boxStatus = {
      selected: false,
      symbol: '',
      iswin: false
    };
  }

  componentDidMount() {
    console.log('mounted');
    this.setHeight();
    window.addEventListener('resize', this.setHeight);
    // this.boxRef.current.addEventListener('click', this.props.registerTurn);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isOver && !this.props.isOver) {
      console.log('Board reset');
      this.setState({ resetBox: !this.state.resetBox });
      this.intializeBox();
    }
  }

  setHeight = () => {
    const width = this.boxRef.current.clientWidth;
    // console.log(this.boxRef.current);
    this.props.setHeight(width);
  };

  registerMove = (e) => {
    if (this.props.isOver) {
      return;
    }
    this.boxStatus.selected = true;
    this.boxStatus.symbol = this.boxStatus.symbol || this.getSymbol();
    this.props.registerTurn(e.target.id, this.boxStatus.symbol);
  };

  getSymbol = () => {
    return this.props.player == 1 ? '0' : 'X';
  };

  render() {
    const styleOptions = this.props.isWinner
      ? {
          height: this.props.boxHeight,
          backgroundColor: 'lightblue'
        }
      : { height: this.props.boxHeight };

    return (
      <div
        className={`playing-box ${this.props.id}`}
        id={this.props.id}
        ref={this.boxRef}
        style={styleOptions}
        onClick={(e) => this.registerMove(e)}
      >
        {this.boxStatus.symbol}
      </div>
    );
  }
}

export default BoardBox;
