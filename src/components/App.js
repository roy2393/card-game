import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import SampleCards from '../sample-cards';
import SlotContainer from './SlotContainer';
import Toolbar from './Toolbar';
import Deck from './Deck';
// import base from '../base';


class App extends Component {
  constructor(){
    super();
    this.state = {
      usedCards : {
        'spade' : [],
        'diamond' : [],
        'club' : [],
        'heart' : []
      },

      availableCards : []
    }

    this.moveCard = this.moveCard.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  componentWillMount(){
    const numOfCards = SampleCards.length;
    const sample = SampleCards.slice();
    const availableCards = [];
    for(let i = 0 ; i<numOfCards; i++){
      var rand = Math.floor((Math.random() * sample.length - 1) + 1);
      availableCards[i] = sample[rand];
      sample.splice(rand,1);
    }
    this.setState({availableCards});
  }

  moveCard(card){
    const usedCards = this.state.usedCards;
    const availableCards = this.state.availableCards;
    usedCards[card.type].push(card.value);

    const len = availableCards.length;
    for(let i=0; i< len ; i++){
      if(availableCards[i].type === card.type && availableCards[i].value === card.value){
        console.log('same card ');
        availableCards.splice(i,1);
        break;
      }
    }

    this.setState({usedCards, availableCards});

  }

  resetGame(){
    const usedCards = {
                        'spade' : [],
                        'diamond' : [],
                        'club' : [],
                        'heart' : []
                      };

    console.log('sample - ',SampleCards);
    const numOfCards = SampleCards.length;
    const sample = SampleCards.slice();
    const availableCards = [];
    for(let i = 0 ; i<numOfCards; i++){
      var rand = Math.floor((Math.random() * sample.length - 1) + 1);
      availableCards[i] = sample[rand];
      sample.splice(rand,1);
    }
    this.setState({usedCards, availableCards});
  }
 
  render() {
    return (
      <div className="App">
        <Toolbar resetGame={this.resetGame} />
        <Deck availableCards={this.state.availableCards} />
        <SlotContainer usedCards = {this.state.usedCards} moveCard={this.moveCard}/>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
