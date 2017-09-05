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
      usedCards : {
                        spade : [-1],
                        diamond : [-1],
                        club : [-1],
                        heart : [-1]
                      },

      availableCards : []
    }

    this.moveCard = this.moveCard.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.logout = this.logout.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
  }

  componentWillMount(){

    console.log('State - ',this.state);
    this.ref = base.syncState(`${this.props.params.userName}/usedCards`,
    {
      context: this,
      state: 'usedCards'
    })

  }

  componentWillUnmount(){
    base.removeBinding(this.ref);
  }

  componentDidMount(){
        base.onAuth((user) => {
          console.log('user exists', user);

            if(user){
                this.authHandler(null, {user});
            } else {
                const usedCards = {
                        spade : [-1],
                        diamond : [-1],
                        club : [-1],
                        heart : [-1]
                      };
                this.setState({usedCards});
            }
        });

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

  authenticate(provider){
        console.log(`Trying to login with ${provider}`);
        console.log(base);
        base.authWithOAuthPopup(provider, this.authHandler);
    }

  authHandler(err, authData){
        console.log(authData);
        if(err){
            console.error(err);
            return;
        }

        // grab the store info
        const storeRef =  base.database().ref(this.props.userName);

        // query the firebase once for the store data
        storeRef.once('value', (snapshot) => {
            const data = snapshot.val() || {};
            console.log('snapshot - ', data);
            this.setState({
                uid: authData.user.uid,
            });
        })
    }

  moveCard(card){
    const usedCards = this.state.usedCards;
    const availableCards = this.state.availableCards;
    usedCards[card.type].push(card.value);

    const len = availableCards.length;
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
 
  render() {

    return (
      <div className="App">
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
