let timer;
let timerID;
let pausedTime;
const timerWrapper = document.querySelector('.timer');
const timerBlockElement = document.querySelector('.timer span');
const pauseGameBtn = document.querySelector('.pause-icon-wrapper');
const playGameBtn = document.querySelector('.play-icon-wrapper');
const pauseBtnMenu = document.querySelector('.pause');
pauseBtnMenu.onclick = togglePause;

pauseGameBtn.onclick = onPauseGameClick;

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

const timerValue = {
  level1: 60,
  level2: 120,
  level3: 180,
};

function onPauseGameClick() {
  pauseTimer();
}

function togglePause() {
  pauseGameBtn.classList.toggle('hidden');
  playGameBtn.classList.toggle('hidden');
}
