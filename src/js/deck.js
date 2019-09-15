export class Deck {
  constructor() {
    this.model = [];
  }

  generateDeck(len) {
    let arr = [...Array(len).keys()].map((i, index) => {
      if (index % 2 !== 0) {
        return { value: i - 1, open: false, match: false, id: index };
      }
      return { value: i, open: false, match: false, id: index };
    });
    arr = this.shuffleDeck(arr, 4);
    return arr;
  }

  shuffleDeck(deck, num = 1) {
    [...Array(num).keys()].forEach(() => {
      deck = deck.sort(() => Math.random() - 0.5);
    });
    return deck;
  }

}
