import React, { Component } from 'react';
import Card from './Card';
import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';
import { canDropCard, moveCard } from './Game';

const squareTarget = {

  canDrop(props) {
    return canDropCard(props.cardType);
  },

  drop(props) {
    moveCard(props.cardType, props.moveCard);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class Slot extends Component {

	constructor(){
		super();
		this.renderCards = this.renderCards.bind(this); 
	}

	renderCards(card){
    if(card.value >= 0){
		  return <Card key={card.type+card.value} type={card.type} value={card.value}/>
    }
	}

  render() {
  	const {connectDropTarget, isOver } = this.props;

    return connectDropTarget(
      <div className="slot-box" id={this.props.cardType}>
        <h3>{this.props.cardType}</h3>

      	<div className="slot">
      		{this.props.cards.map(this.renderCards)}

      		{isOver &&
  	          <div style={{
  	            position: 'absolute',
  	            top: 0,
  	            left: 0,
  	            height: '100%',
  	            width: '100%',
  	            zIndex: 1,
  	            opacity: 0.5,
  	            backgroundColor: 'yellow',
  	          }} />
  	        }
      	</div>
      </div>
    	);
  }
}


export default DropTarget(ItemTypes.CARD, squareTarget, collect)(Slot);