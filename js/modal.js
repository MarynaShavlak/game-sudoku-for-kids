const cloudOpenModal = document.querySelector('.cloud-rules');
const catOpenModal = document.querySelector('.cat-rules');
const rulesTitle = document.querySelector('#rules');
const rulesModal = document.querySelector('.rules-modal');

const modalWindow = document.querySelector('.modal');
const modalOverlay = document.querySelector('.modal__overlay');
const restartBtnWin = document.querySelector('#restartBtnWin');
const restartBtnLose = document.querySelector('#restartBtnLose');
const winWindow = document.querySelector('.end-game-win.modal');
const loseWindow = document.querySelector('.end-game-lose.modal');

const rulesWindow = document.querySelector('.rules-modal');
const confirmationWindow = document.querySelector('.confirmation-modal');
const pauseGameWindow = document.querySelector('.pause-game-modal');
const continueGameBtn = document.querySelector('.continueGameBtn');
const rulesCloseIcon = document.querySelector('.rules-close-icon');
const confirmCloseIcon = document.querySelector('.confirm-close-icon');
const cancelBtn = document.querySelector('.cancelBtn');
const confirmBtn = document.querySelector('.confirmBtn');

cloudOpenModal.addEventListener('click', openRules);
catOpenModal.addEventListener('click', openRules);
rulesTitle.addEventListener('click', openRules);
confirmCloseIcon.addEventListener('click', closeConfirmationModal);
cancelBtn.addEventListener('click', closeConfirmationModal);
confirmBtn.addEventListener('click', backToStartMenu);
continueGameBtn.addEventListener('click', continueGame);
rulesCloseIcon.addEventListener('click', closeRulesModal);

function openRules() {
  rulesModal.classList.add('modal--isActive');
}

function closeRulesModal() {
  rulesWindow.classList.remove('modal--isActive');
}

function openConfirmationModal() {
  const content = document.querySelector('.confirmation-modal .modal__content');
  content.style.background = `url('./images/${chosenTopic}/background.jpg') no-repeat center center`;
  content.style.backgroundSize = 'cover';
  confirmationWindow.classList.add('modal--isActive');
  pauseTimer();
}

function openPauseModal() {
  const content = document.querySelector('.pause-game-modal .modal__content');
  content.style.background = `url('./images/${chosenTopic}/background.jpg') no-repeat center center`;
  content.style.backgroundSize = 'cover';
  pauseGameWindow.classList.add('modal--isActive');
}

function closeConfirmationModal() {
  confirmationWindow.classList.remove('modal--isActive');
  if (timerID) {
    setTimer(pausedTime);
    countdownTime();
  }
}

function closeWinWindow() {
  winWindow.classList.remove('modal--isActive');
}

function closeLoseWindow() {
  loseWindow.classList.remove('modal--isActive');
}

function openGameResultModal(modalElement) {
  const imageUrl = modalElement.classList.contains('.end-game-win')
    ? `./images/${chosenTopic}/win.jpg`
    : `./images/${chosenTopic}/lose.jpg`;
  const content = modalElement.querySelector('.modal__content');
  content.style.background = `url('${imageUrl}') no-repeat center center`;
  content.style.backgroundSize = 'cover';
  modalElement.classList.add('modal--isActive');
  clearInterval(timerID);
}

restartBtnWin.onclick = function () {
  reloadGame();
  closeWinWindow();
};

restartBtnLose.onclick = function () {
  reloadGame();
  closeLoseWindow();
};

function reloadGame() {
  resetAndStopAudioPlayer();
  clearInterval(timerID);
  hideGameField();
  showStartWindow();
  resetCardsBoard();
}

function resetCardsBoard() {
  cardsContainer.innerHTML = '';
  createTaskBoard();
  createImageSelectionBlock(solution);
}

function backToStartMenu() {
  closeConfirmationModal();
  clearInterval(timerID);
  hideGameField();
  showStartWindow();
  resetAndStopAudioPlayer();
  resetCardsBoard();
  isPaused = false;
}

function continueGame() {
  pauseGameWindow.classList.remove('modal--isActive');
  pauseGameBtn.classList.toggle('hidden');
  playGameBtn.classList.toggle('hidden');
  if (timerID) {
    isPaused = false;
    setTimer(pausedTime);
    countdownTime();
  }
}
