import { Deck } from './deck';

const deck = new Deck();

export class UI {
  constructor() {
    this.timer = null;
    this.wait = ms => new Promise((r, j) => setTimeout(r, ms));
    this.timerSeconds = 0;
    this.timerMinutes = 0;
    this.$deck = document.querySelector('.deck');
    this.$el = [];
    this.$reset = document.querySelector('.restart');
    this.$timerSeconds = document.querySelector('.timer-seconds');
    this.$timerMinutes = document.querySelector('.timer-minutes');
  }

  liClickHandler(ev) {
    const $li = ev.target;
    const id = parseInt($li.id, 10);
    let open = 0;
    deck.model.forEach(i => {
      if (i.id === id) {
        i.open = true;
        open++;
      }
    });

    console.log(open, 'open');

    deck.model = deck.model.map(i => {
      if (i.id === id) {
        i.open = true;
      }
      return i;
    });
    console.log(id, deck.model);

    if (!$li.classList.contains('open')) {
      $li.classList.add('open');
      // deck = deck.map(j => {
      //   if (j.id === id) {
      //     j.open = true;
      //   }
      //   return j;
      // });
    } else {
      $li.classList.remove('open');
      // deck = deck.map(j => {
      //   if (j.id === id) {
      //     j.open = false;
      //   }
      //   return j;
      // });
    }
  }

  renderDeck(deck) {
    deck.forEach((i, index) => {
      const el = document.createElement('li');
      el.setAttribute('id', `${i.id}`);
      el.setAttribute('class', 'card');
      el.innerText = i.value;
      el.addEventListener('click', this.liClickHandler);

      this.$el[index] = el;
      this.$deck.appendChild(el);
    });
  }

  initGame() {
    deck.model = deck.generateDeck(16);
    this.renderDeck(deck.model);
    this.$reset.addEventListener('click', () => {
      this.$el.forEach(i => i.removeEventListener('click', this.liClickHandler));
      this.$el = [];
      deck.model = deck.generateDeck(16);
      this.renderDeck(deck.model);
    });
  }

}
