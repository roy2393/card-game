import React, { Component } from 'react';
import Card from './Card';
export default class Deck extends Component {

	constructor(){
		super();
		this.renderCards = this.renderCards.bind(this); 
	}

	renderCards(card){
		return <Card key={card.type+card.value} type={card.type} value={card.value}/>
	}

  render() {
    return (
    	<div className="deck">
    		{this.props.availableCards.map(this.renderCards)}
    	</div>
    	);
  }
}