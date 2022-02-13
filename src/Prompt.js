import React from 'react';
import './Prompt.css';

class Prompt extends React.Component {
  render() {
    return (
      <div className="prompt">
        {this.props.message ? <div>{this.props.message}</div> : null}

        {!this.props.isOver ? (
          <div>Player {this.props.currentPlayer} turn!!</div>
        ) : (
          <div className="button">
            <button onClick={this.props.reset}>Play Again</button>
          </div>
        )}
      </div>
    );
  }
}

export default Prompt;
