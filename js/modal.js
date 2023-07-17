const statisticsModal = document.querySelector('.statistics-modal');
const modalWindow = document.querySelector('.modal');
const modalOverlays = document.querySelectorAll('.modal__overlay');
const restartBtnWin = document.querySelector('#restartBtnWin');
const restartBtnLose = document.querySelector('#restartBtnLose');
const winWindow = document.querySelector('.end-game-win.modal');
const loseWindow = document.querySelector('.end-game-lose.modal');

const pauseGameWindow = document.querySelector('.pause-game-modal');
const continueGameBtn = document.querySelector('.continueGameBtn');
const confirmationWindow = document.querySelector('.confirmation-modal');
const confirmCloseIcon = document.querySelector('.confirm-close-icon');
const confirmBtn = document.querySelector('.confirmBtn');
confirmCloseIcon.addEventListener('click', closeConfirmationModal);

confirmBtn.addEventListener('click', backToStartMenu);
const statisticsCloseIcon = document.querySelector('.statistics-close-icon');
const cancelBtn = document.querySelector('.cancelBtn');
const statText = document.querySelector('.stat-info-block p');
const statIcon = document.querySelector('.stat-info-block');

cancelBtn.addEventListener('click', closeConfirmationModal);
continueGameBtn.addEventListener('click', continueGame);

restartBtnWin.addEventListener('click', onRestartBtnWinClick);
restartBtnLose.addEventListener('click', onRestartBtnLoseClick);
statIcon.addEventListener('click', openStatisticsModal);
statText.addEventListener('click', openStatisticsModal);
statisticsCloseIcon.addEventListener('click', closeStatisticsModal);

function openStatisticsModal() {
  statisticsModal.classList.add('modal--isActive');
  updateStatisticsTable('level1');
}
function closeStatisticsModal() {
  statisticsModal.classList.remove('modal--isActive');
  resetActiveStatLevel();
}

function openConfirmationModal() {
  openModal(confirmationWindow);
  pauseTimer();
}

function closeConfirmationModal() {
  confirmationWindow.classList.remove('modal--isActive');
  runTimer();
}

function openModal(modalElement) {
  const isWinWindow = modalElement.classList.contains('end-game-win');
  const isLoseWindow = modalElement.classList.contains('end-game-lose');
  const isRulesWindow = modalElement.classList.contains('rules-modal');
  const imageUrl = isWinWindow
    ? `./images/${chosenTopic}/win.jpg`
    : isLoseWindow
    ? `./images/${chosenTopic}/lose.jpg`
    : isRulesWindow
    ? `./images/modal-rules.jpg`
    : `./images/${chosenTopic}/background.jpg`;
  const content = modalElement.querySelector('.modal__content');
  content.style.background = `url('${imageUrl}') no-repeat center center`;
  content.style.backgroundSize = 'cover';
  modalElement.classList.add('modal--isActive');
}

function openGameResultModal(modalElement) {
  openModal(modalElement);
  clearInterval(timerID);
}

function closeGameResultModal(modalElement) {
  modalElement.classList.remove('modal--isActive');
}

function reloadGame() {
  resetAndStopAudioPlayer();
  clearInterval(timerID);
  hideGameField();
  showStartWindow();
  resetCardsBoard();
}

function resetCardsBoard() {
  cardsContainer.innerHTML = '';
  insertTaskBoard();
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
  updateLocalStorage();
}

function continueGame() {
  pauseGameWindow.classList.remove('modal--isActive');
  pauseGameBtn.classList.toggle('hidden');
  playGameBtn.classList.toggle('hidden');
  runTimer();
}

function onRestartBtnWinClick() {
  reloadGame();
  closeGameResultModal(winWindow);
  setGameTimeResults();
  updateLocalStorage();
}
function onRestartBtnLoseClick() {
  reloadGame();
  closeGameResultModal(loseWindow);
  updateLocalStorage();
}
