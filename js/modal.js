const cloudOpenModal = document.querySelector('.cloud-rules');
const catOpenModal = document.querySelector('.cat-rules');
const rulesTitle = document.querySelector('#rules');
const rulesModal = document.querySelector('.rules-modal');
const statisticsModal = document.querySelector('.statistics-modal');
const modalWindow = document.querySelector('.modal');
const modalOverlays = document.querySelectorAll('.modal__overlay');
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
const statisticsCloseIcon = document.querySelector('.statistics-close-icon');
const cancelBtn = document.querySelector('.cancelBtn');
const confirmBtn = document.querySelector('.confirmBtn');
const statText = document.querySelector('.stat-info-block p');
const statIcon = document.querySelector('.stat-info-block');

cloudOpenModal.addEventListener('click', openRules);
catOpenModal.addEventListener('click', openRules);
rulesTitle.addEventListener('click', openRules);
confirmCloseIcon.addEventListener('click', closeConfirmationModal);
cancelBtn.addEventListener('click', closeConfirmationModal);
confirmBtn.addEventListener('click', backToStartMenu);
continueGameBtn.addEventListener('click', continueGame);
rulesCloseIcon.addEventListener('click', closeRulesModal);
restartBtnWin.addEventListener('click', onRestartBtnWinClick);
restartBtnLose.addEventListener('click', onRestartBtnLoseClick);
statIcon.addEventListener('click', openStatisticsModal);
statText.addEventListener('click', openStatisticsModal);
statisticsCloseIcon.addEventListener('click', closeStatisticsModal);
modalOverlays.forEach(overlay => {
  overlay.addEventListener('click', closeStatisticsModal);
  overlay.addEventListener('click', closeRulesModal);
});

function openRules() {
  rulesModal.classList.add('modal--isActive');
}
function openStatisticsModal() {
  statisticsModal.classList.add('modal--isActive');
  updateStatisticsTable('level1');
}
function closeStatisticsModal() {
  statisticsModal.classList.remove('modal--isActive');
  resetActiveStatLevel();
}

function closeRulesModal() {
  rulesWindow.classList.remove('modal--isActive');
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

  const imageUrl = isWinWindow
    ? `./images/${chosenTopic}/win.jpg`
    : isLoseWindow
    ? `./images/${chosenTopic}/lose.jpg`
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
  console.log('statistics: ', statistics);
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
  localStorage.setItem('statistics', JSON.stringify(statistics));
  console.log('statistics: ', statistics);
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
  localStorage.setItem('statistics', JSON.stringify(statistics));
  console.log('statistics: ', statistics);
}
function onRestartBtnLoseClick() {
  reloadGame();
  closeGameResultModal(loseWindow);
  localStorage.setItem('statistics', JSON.stringify(statistics));
  console.log('statistics: ', statistics);
}
