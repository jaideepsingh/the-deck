import Card from './card';

const SUITS = {
  "CLUB": "club",
  "DIAMOND": "diamond",
  "HEART": "heart",
  "SPADE": "spade"
};

const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const MAX_SIZE = 52;

class Deck {
  constructor() {
    this.cards = [];
    this.missingCards = [];

    for(let suit in SUITS) {
      for(let i=0; i < RANKS.length; i++) {
        this.cards.push(new Card(RANKS[i], SUITS[suit]));
      }
    }
  }

  drawCards = (num) => {
    //Take the first n cards
    let drawnCards = this.cards.splice(0, num);
    
    //Store the drawn cards in missingCards collection
    this.missingCards.push(...drawnCards);
    return drawnCards;
  }

  addCard = (card) => {
    //Make sure the deck doesnt exceed the MAX_SIZE of 52
    if(this.cards.length < MAX_SIZE) {
      
      //Find the card in the missingCards collection
      for(let i=0; i < this.missingCards.length; i++) {
        if(this.missingCards[i].rank === card.rank && this.missingCards[i].suit === card.suit) {
          //Push the card to the top of the deck
          this.cards.unshift(...this.missingCards.splice(i, 1));
        }
      }
    } else {
      console.log('ERROR: The deck is full');
    }
  }

  isEmpty = () => 
    this.cards.length === 0 && this.missingCards.length === MAX_SIZE;

  refillCards = () => {
    this.cards.unshift(...this.missingCards);
    this.missingCards = [];
  }

  shuffle = () => {
    let cards = this.cards;
    
    //Using the Fisher-Yates (aka Knuth) shuffle algorithm
    let currentIndex = cards.length, temporaryValue, randomIndex;
    
    while (0 !== currentIndex) {
      // Pick a remaining card...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current card.
      temporaryValue = cards[currentIndex];
      cards[currentIndex] = cards[randomIndex];
      cards[randomIndex] = temporaryValue;
    }
  }
};

export default Deck;