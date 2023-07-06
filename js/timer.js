let timer;
let timerID;
let pausedTime;
const timerWrapper = document.querySelector('.timer');
const timerBlockElement = document.querySelector('.timer span');

function setTimer(value) {
  timer = value;
  timerBlockElement.innerHTML = timer;
}

function countdownTime() {
  timerID = setInterval(() => {
    timer--;
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
  }
}

function playTimer() {
  if (timerID) {
    setTimer(pausedTime);
    countdownTime();
  }
}

const timerValue = {
  level1: 60,
  level2: 120,
  level3: 180,
};
