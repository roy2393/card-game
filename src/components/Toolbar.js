import React, { Component } from 'react';
export default class Toolbar extends Component {

  render() {
    return (
    	<div className="toolbar">
    		 <button onClick={this.props.resetGame}>Reset</button>
    	</div>
    	);
  }
}