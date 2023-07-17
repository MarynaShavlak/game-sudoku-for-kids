const statisticsModal = document.querySelector('.modal--statistics');
const modalWindow = document.querySelector('.modal');
const modalOverlays = document.querySelectorAll('.modal__overlay');
const restartBtnWin = document.querySelector('#restartBtnWin');
const restartBtnLose = document.querySelector('#restartBtnLose');
const winWindow = document.querySelector('.modal--end-game-win');
const loseWindow = document.querySelector('.modal--end-game-lose');

const pauseGameWindow = document.querySelector('.modal--pause-game');
const continueGameBtn = document.querySelector('#continueGameBtn');
const confirmationWindow = document.querySelector('.modal--confirmation');
const confirmCloseIcon = document.querySelector('.modal__closeIcon--confirm');
const confirmBtn = document.querySelector('.modal__button--confirm');
confirmCloseIcon.addEventListener('click', closeConfirmationModal);

confirmBtn.addEventListener('click', backToStartMenu);
const statisticsCloseIcon = document.querySelector(
  '.statistics-modal__closeIcon',
);
const cancelBtn = document.querySelector('.modal__button--cancel');
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
  const isWinWindow = modalElement.classList.contains('modal--end-game-win');
  const isLoseWindow = modalElement.classList.contains('modal--end-game-lose');
  const isRulesWindow = modalElement.classList.contains('modal--rules');
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
