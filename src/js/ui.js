import { Deck } from './deck';

export class UI extends Deck {
  constructor() {
    super();
    this.wait = ms => new Promise((r, j) => setTimeout(r, ms));
    this.tick = null;
    this.$deck = document.querySelector('.deck');
    this.$el = [];
    this.$reset = document.querySelectorAll('.restart');
    this.$win = document.querySelector('.victory-dialog');
    this.moves = 0;
    this.$moves = document.querySelector('.moves');
    this.timerSeconds = 0;
    this.timerMinutes = 0;
    this.$timerSeconds = document.querySelector('.timer-seconds');
    this.$timerMinutes = document.querySelector('.timer-minutes');
    this.onCardClickRef = this.onCardClick.bind(this);
  }

  onCardClick(ev) {
    this.moves++;
    this.$moves.innerHTML = this.moves;
    const $li = ev.currentTarget;
    const id = parseInt($li.id, 10);
    let curr = {};
    let open = 0;
    this.model = this.model.map((i, index) => {
      if (i.id === id) {
        curr = { el: i, index: index };
        i.open = !i.open;
        if (i.open) {
          const len = this.model.filter(i => i.open).length;
          if (len === 2) {
            this.checkForMatch(curr.el, curr.index);
          }
          $li.classList.add('open');
        } else {
          $li.classList.remove('open');
        }
      }
      if (i.open) {
        open++;
      }
      return i;
    });
    if (open > 2) {
      this.closeCards(id);
    }
  }

  checkForMatch(curr, currIndex) {
    this.model = this.model.map((el, index) => {
      if (
        curr.value === el.value &&
        curr.open &&
        el.open &&
        currIndex !== index
      ) {
        el.match = true;
        this.model[currIndex].match = true;
        el.open = false;
        this.model[currIndex].open = false;
        this.$el[currIndex].classList.remove('open');
        this.$el[index].classList.remove('open');
        this.$el[currIndex].classList.add('match');
        this.$el[index].classList.add('match');
        this.$el[currIndex].removeEventListener('click', this.onCardClickRef);
        this.$el[index].removeEventListener('click', this.onCardClickRef);

        const end = this.model.filter(i => !i.match).length;
        if (end === 0) {
          clearInterval(this.tick);
          setTimeout(() => {
              this.$win.classList.add('active');
            },
            300);
        }
      }
      return el;
    });
  }

  closeCards(curr) {
    this.model = this.model.map((i, index) => {
      if (curr === i.id) {
      } else if (!i.match) {
        i.open = false;
        this.$el[index].classList.remove('open');
      }
      return i;
    });
  }

  renderDeck() {
    this.model.forEach((i, index) => {
      const el = document.createElement('li');
      el.setAttribute('id', `${i.id}`);
      el.setAttribute('class', 'card');
      el.innerHTML = i.value;

      el.addEventListener('click', this.onCardClickRef);

      this.$el[index] = el;
      this.$deck.appendChild(el);
    });
  }

  init() {
    this.model = this.generateDeck(16);
    this.renderDeck();
    this.tick = setInterval(() => this.startTick(), 1000);
    this.enableReset();
  }

  enableReset() {
    this.$reset.forEach(el => {
      el.addEventListener('click', () => {
        if (this.$win.classList.contains('active')) {
          this.$win.classList.remove('active');
        }
        this.resetTimeAndMoves();
        this.$el.forEach(i => i.removeEventListener('click', this.onCardClickRef));
        this.$el = [];
        this.$deck.innerHTML = '';
        this.model = this.generateDeck(16);
        this.renderDeck();
      });
    });
  }

  startTick() {
    this.timerSeconds++;
    if (this.timerSeconds === 60) {
      this.timerMinutes++;
      this.$timerMinutes.innerHTML = this.timerMinutes > 9 ? this.timerMinutes : `0${this.timerMinutes}`;
      this.timerSeconds = 0;
    }
    this.$timerSeconds.innerHTML = this.timerSeconds > 9 ? this.timerSeconds : `0${this.timerSeconds}`;
  }

  resetTimeAndMoves() {
    clearInterval(this.tick);
    this.timerMinutes = 0;
    this.$timerMinutes.innerHTML = '00';
    this.timerSeconds = 0;
    this.$timerSeconds.innerHTML = '00';
    this.tick = setInterval(() => this.startTick(), 1000);
    this.moves = 0;
    this.$moves.innerHTML = this.moves;
  }

}
