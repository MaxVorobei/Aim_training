'use strict'

const startBtn = document.querySelector('#start'),
      screens = document.querySelectorAll('.screen'),
      timeList = document.querySelector('#time-list'),
      timeEl = document.querySelector('#time'),
      board = document.querySelector('#board'),
      colors = ['red', 'yellow', 'green', 'blue', 'violet'];

let time = 0,
   score = 0;


startBtn.addEventListener('click', (event) => {
   event.preventDefault();
   screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
   if (event.target.classList.contains('time-btn')) {
      time = +event.target.getAttribute('data-time');
      screens[1].classList.add('up');
      startGame();
   }
})

board.addEventListener('click', event => {
   if (event.target.classList.contains('circle')) {
      score++;
      event.target.remove();
      createRandomCircule();
   }
})

function startGame() {
   setInterval(decreaseTime, 1000);
   createRandomCircule();
   setTime(time);
}

function decreaseTime() {
   if (time === 0) {
      finishGame();
   } else {
      let current = --time
      if (current < 10) {
         current = `0${current}`
      }
      setTime(current);
   }
}

function setTime(value) {
   timeEl.innerHTML = `00:${value}`
}

function finishGame() {
   timeEl.parentNode.classList.add('hide');
   board.innerHTML = `<h1>Your score: <span class="primary">${score}</span></h1>`
}

function createRandomCircule() {
   const circle = document.createElement('div'),
         size = getRandomNumber(10, 50),
         {width, height} = board.getBoundingClientRect(),
         x = getRandomNumber(0, width - size),
         y = getRandomNumber(0, height - size),
         color = generateRandomColor();



   circle.classList.add('circle');
   circle.style.width = `${size}px`;
   circle.style.height = `${size}px`;
   circle.style.top = `${y}px`;
   circle.style.left = `${x}px`;

   circle.style.background = `${color}`;

   board.append(circle);
}

function getRandomNumber(min, max) {
   return Math.round(Math.random()* (max - min) + min)
}

function generateRandomColor() {

   const hexCodes = '0123456789ABCDEF';
let color = '';
   for (let i = 0; i < 6; i++) {
   color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
   }

   return '#' + color;
}


function winTheGame() {

   function kill() {
   const circle = document.querySelector('.circle');

      if (circle) {
         circle.click();
      }
   }
   setInterval(kill, 15)
}