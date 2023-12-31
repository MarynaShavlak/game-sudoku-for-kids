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
const pauseGameBtn = document.querySelector('.pause__pause-icon-wrapper');
const playGameBtn = document.querySelector('.pause__play-icon-wrapper');
const pauseBtnMenu = document.querySelector('.sounds-control__pause');
pauseBtnMenu.addEventListener('click', togglePause);

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
      openGameResultModal(loseWindow);
      statistics[chosenLevel].isWinBefore = false;
      updateLosesQuantity();
      updateWinsPercentage();
      resetTimer();
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
    openModal(pauseGameWindow);
    pauseTimer();
  }
}

function runTimer() {
  if (timerID) {
    isPaused = false;
    setTimer(pausedTime);
    countdownTime();
  }
}

function setTimerInterface() {
  if (chosenGameType === 'game-without-timer') {
    timerWrapper.style.display = 'none';
    pauseBtnMenu.style.display = 'none';
  } else {
    timerWrapper.style.display = 'flex';
    pauseBtnMenu.style.display = 'block';
    setTimer(timerValue[chosenLevel]);
    countdownTime();
  }
}

function resetTimer() {
  timerID = null;
  timer = null;
}
