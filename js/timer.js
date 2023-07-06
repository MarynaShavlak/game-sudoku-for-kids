let timer;
let timerID;
let pausedTime;
const timerWrapper = document.querySelector('.timer');
const timerBlockElement = document.querySelector('.timer span');

function setTimer(value) {
  console.log('value: ', value);
  timer = value;
  timerBlockElement.innerHTML = timer;
}

function countdownTime() {
  timerID = setInterval(() => {
    timer--;
    console.log('timer: ', timer);
    timerBlockElement.innerHTML = timer;
    if (timer <= 0) {
      clearInterval(timerID);
      openLoseWindow();
    }
  }, 1000);
}

function pauseTimer() {
  if (timerID) {
    clearInterval(timerID);
    pausedTime = timer;
    console.log('pausedTime : ', pausedTime);
  }
}

function playTimer() {
  if (timerID) {
    console.log('play again');
    setTimer(pausedTime);
    countdownTime();
  }
}

const timerValue = {
  level1: 60,
  level2: 120,
  level3: 180,
};
