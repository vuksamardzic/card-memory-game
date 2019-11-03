let shape = [
  `<i class="fa fa-heart" aria-hidden="true"></i>`,
  `<i class="fa fa-bolt" aria-hidden="true"></i>`,
  `<i class="fa fa-leaf" aria-hidden="true"></i>`,
  `<i class="fa fa-paper-plane" aria-hidden="true"></i>`,
  `<i class="fa fa-star" aria-hidden="true"></i>`,
  `<i class="fa fa-plane" aria-hidden="true"></i>`,
  `<i class="fa fa-eur" aria-hidden="true"></i>`,
  `<i class="fa fa-bomb" aria-hidden="true"></i>`,
  `<i class="fa fa-camera" aria-hidden="true"></i>`,
  `<i class="fa fa-child" aria-hidden="true"></i>`,
  `<i class="fa fa-cube" aria-hidden="true"></i>`,
  `<i class="fa fa-eye" aria-hidden="true"></i>`,
  `<i class="fa fa-key" aria-hidden="true"></i>`,
  `<i class="fa fa-tint" aria-hidden="true"></i>`,
  `<i class="fa fa-tree" aria-hidden="true"></i>`,
  `<i class="fa fa-umbrella" aria-hidden="true"></i>`
];

export class Deck {
  constructor() {
    this.model = [];
  }


  generateDeck(len) {
    shape = this.shuffleDeck(shape, 4);
    let cut = shape.slice(0, len / 2);
    cut = cut.concat(cut);
    cut = this.shuffleDeck(cut, 4);
    let arr = [...Array(len).keys()].map((i, index) => {
      if (index % 2 !== 0) {
        return { value: cut[i], open: false, match: false, id: index };
      }
      return { value: cut[i], open: false, match: false, id: index };
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
