import Deck from '../deck';
import Card from '../card';

describe('The card deck', () => {
  let deck;
  
  beforeEach(() => {
    deck = new Deck();
  });
  it('should create a new card deck with 52 cards', () => {
    expect(deck.cards.length).toBe(52);
  });

  it('should draw a specific number of cards from the top of the deck', () => {
    let drawnCards = deck.drawCards(3);
    expect(deck.missingCards.length).toBe(3);
    expect(drawnCards.length).toBe(3);
    expect(drawnCards[0].rank).toBe('A');
    expect(drawnCards[0].suit).toBe('club');
  });

  it('should add a new card to the top of the deck', () => {
    deck.drawCards(2);
    let newCard = new Card('A', 'club');
    deck.addCard(newCard);
    expect(deck.cards.length).toBe(51);
    expect(deck.missingCards.length).toBe(1);
  });

  it('should check if the deck is empty', () => {
    deck.drawCards(52);
    expect(deck.isEmpty()).toBe(true);
  });

  it('should refill the deck with the drawn cards', () => {
    deck.drawCards(10);
    deck.refillCards();
    expect(deck.cards.length).toBe(52);
  });

  it('should shuffle the order of the cards in the deck', () => {
    deck.shuffle();
    expect(deck.cards[51]).not.toEqual(new Card('K', 'spade'));
  });

});