import React, { Component } from 'react';
import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';
import { setDragCard } from './Game';

const cardSource = {
  beginDrag(props) {
  	setDragCard(props);
    return {props};
  },

  endDrag(props, monitor, component) {
  	// setDragCard(null);
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Card extends Component {
  render() {
    const { connectDragSource, isDragging } = this.props;
    
    return connectDragSource(
    	<div className="card" style={{
		        opacity: isDragging ? 0.5 : 1,
		        fontSize: 25,
		        fontWeight: 'bold',
		        cursor: 'move'
		      }}>
    		<span className="cardType">{this.props.type}</span>
    		<span className="cardValue">{this.props.value}</span>
    	</div>
    	);
  }
}

export default DragSource(ItemTypes.CARD, cardSource, collect)(Card);