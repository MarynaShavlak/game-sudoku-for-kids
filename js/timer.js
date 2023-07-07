let timer;
let timerID;
let pausedTime;
let isPaused = false;
const timerValue = {
  level1: 60,
  level2: 120,
  level3: 180,
};
const timerWrapper = document.querySelector('.timer');
const timerBlockElement = document.querySelector('.timer span');
const pauseGameBtn = document.querySelector('.pause-icon-wrapper');
const playGameBtn = document.querySelector('.play-icon-wrapper');
const pauseBtnMenu = document.querySelector('.pause');
pauseBtnMenu.onclick = togglePause;

function setTimer(value) {
  timer = value;
  timerBlockElement.innerHTML = timer;
}

function countdownTime() {
  timerID = setInterval(() => {
    if (!isPaused) {
      timer--;
      timerBlockElement.innerHTML = timer;
    }

    if (timer <= 0) {
      clearInterval(timerID);
      openLoseWindow();
    }
  }, 1000);
}

function pauseTimer() {
  if (timerID && !isPaused) {
    clearInterval(timerID);
    pausedTime = timer;
    isPaused = true;
  }
}

function togglePause() {
  pauseGameBtn.classList.toggle('hidden');
  playGameBtn.classList.toggle('hidden');
  if (!isPaused) {
    openPauseModal();
    pauseTimer();
  }
}
