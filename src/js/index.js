import '../scss/main.scss';
import { UI } from './ui';

const ui = new UI();

ui.initGame();

// const el = document.querySelector('#a');
//
// const waitForHello = ms => new Promise((r, j) => {
//   const check = () => {
//     console.log('checking', ms);
//     if (el.innerHTML === 'Hello world')
//       r();
//     else if ((ms -= 100) < 0)
//       j('promise rejected');
//     else
//       setTimeout(check, 100);
//   };
//   setTimeout(check, 100);
// });

// setTimeout(() => {
//   el.innerHTML = 'Hello world';
// }, 4500);

// (async () => {
//   el.innerHTML = 'waiting..';
//   waitForHello(3000);
// })();

