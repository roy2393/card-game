import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import SampleCards from '../sample-cards';
import SlotContainer from './SlotContainer';
import Toolbar from './Toolbar';
import Deck from './Deck';
import base from '../base'; 


class App extends Component {
  constructor(){
    super();
    this.state = {
      uid: null,
      usedCards : {},
      availableCards : []
    }

    this.moveCard = this.moveCard.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.logout = this.logout.bind(this);
    this.renderGameStatus = this.renderGameStatus.bind(this);
  }

  componentWillUnmount(){
    base.removeBinding(this.ref);
  }

  componentWillMount(){
    const usedCards = this.state.usedCards;
    console.log('empty usedCards', usedCards);
    
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

  componentDidMount(){
    this.ref = base.syncState(`${this.props.params.userName}/usedCards`,
    {
      context: this,
      state: 'usedCards',
      then: this.setDeck,
    });

  }

  setDeck(){
    const usedCards = this.state.usedCards;

    if(Object.keys(usedCards).length === 0){
      usedCards['spade'] = [-1];
      usedCards['heart'] = [-1];
      usedCards['club'] = [-1];
      usedCards['diamond'] = [-1];
    }

    const numOfCards = SampleCards.length;
    const sample = SampleCards.slice();
    const availableCards = [];
    for(let i = 0 ; i<numOfCards; i++){
      var rand = Math.floor((Math.random() * sample.length - 1) + 1);

      if(usedCards[sample[rand].type].indexOf(sample[rand].value) === -1){
        availableCards.push(sample[rand]);
      }
        sample.splice(rand,1);
    }

    this.setState({availableCards});

  }


  moveCard(card){
    const usedCards = this.state.usedCards;
    const availableCards = this.state.availableCards;
    usedCards[card.type].push(card.value);

    const len = availableCards.length;
    console.log({card, availableCards});
    for(let i=0; i< len ; i++){
      if(availableCards[i].type === card.type && availableCards[i].value === card.value){
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

  logout(event){
        base.unauth();
        this.setState({
            uid: null
        })
        console.log('logout - ', this, 'event - ', event);
        this.context.router.transitionTo("/");
    }
  renderGameStatus(){
    this.state.availableCards <= 50 ? 'Game Finished' : '';
  }

  render() {
    return (
      <div className="App">
        <span className="game-status">{this.state.availableCards.length  === 0 ? 'Congratulations! Restart the game to play again!' : ''}</span>
        <Toolbar resetGame={this.resetGame} logout={this.logout} />
        <Deck availableCards={this.state.availableCards} />
        <SlotContainer usedCards = {this.state.usedCards} moveCard={this.moveCard}/>
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object
}

export default DragDropContext(HTML5Backend)(App);
