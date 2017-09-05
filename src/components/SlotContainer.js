import React, { Component } from 'react';
import Slot from './Slot';



export default class SlotContainer extends Component {

	constructor(){
		super();
		this.renderSlot = this.renderSlot.bind(this);
	}

	renderSlot(key){
		const cardsVal = this.props.usedCards[key];
		let cards = [];

		cardsVal.map(function(val){
			return cards.push({
				'type' : key,
				'value' : val
			})
		})

		return (
				<Slot key={key} cards={cards} cardType={key} moveCard={this.props.moveCard}/>
			)
	}
  render() {
    return (
    	<div className="slot-container">
    		{Object.keys(this.props.usedCards).map(this.renderSlot)}
    	</div>
    	);
  }
}
